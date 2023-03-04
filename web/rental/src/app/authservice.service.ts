import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from './user';
import { UserserviceService } from './userservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  loggedInUser:string = "";
  role: any;
  userId: any;
  googleuser:any;
  validCredentials: boolean=true;
  isAdmin: boolean=false;
  isOwner:boolean = false;
  isUser:boolean = false;
  loggedIn: boolean=false;
  private accessToken: any;
  error: any;
  private auth2:any;
  gsignin: boolean = false;

;


  authenticate(user:string,password:string):Observable<any> {
    let credentials = btoa(user+':'+password);
    let headers = new HttpHeaders();
    // console.log(credentials);
    headers = headers.set('Authorization', 'Basic '+credentials)
    return this.httpClient.get(environment.baseUrl+"/authenticate", {headers})
  }

  constructor(private userService:UserserviceService,public router: Router,private httpClient:HttpClient, private ngZone:NgZone) {

    gapi.load("auth2",() =>{
      this.auth2 = gapi.auth2.init({
        client_id: "533316988976-r8quh4cff2bhredgi4blfl38gje4l1s1.apps.googleusercontent.com"
      })
    })


   }

  authenticateUser(user: { username: string; password: string; }){


    this.authenticate(user.username,user.password).subscribe({
        next: (data)=>{
          console.log(data.role)
          this.role=data.role;
          this.loggedInUser =user.username;
          this.userId=user.username;
          this.validCredentials = true;
          if(data.role == 'ADMIN')
          {
            this.isAdmin = true;
          }
          if(data.role == 'OWNER')
          {
            this.isOwner = true;
          }
          if(data.role == 'USER' || data.role == 'GOOGLE_USER')
          {
            this.isUser = true;
          }
          this.loggedIn = true;
          this.accessToken=data.token;
          // console.log(this.accessToken)
          this.router.navigate(['home']);
        },
        error: (error)=>{
          this.validCredentials = false;
          this.error = error.error.message;
          if (error.error.errors != null) {
            this.error = error.error.errors[0];
          }
          console.log(error);
          console.log("ERROR");
        }
      });
  
      }

      logout() {
        console.log("logout")
        // let cartservice:CartService
        this.loggedInUser = "";
        this.isAdmin = false;
        this.isUser = false;
        this.isOwner = false;
        this.loggedIn = false;
        this.userId=null;
        this.role=null;
        if ( this.gsignin == true )
        {
          this.googlesignout();
        }
        // this.router.navigate(['login']);
        // this.router.navigate(['home']);
      }

      googlesignin() {
        if (this.gsignin == false)
        {
          console.log("active");
          this.auth2.signIn().then( (data:any) => {
            console.log('User signed in');
            this.googleuser = this.auth2.currentUser.get().getBasicProfile();
            this.loggedIn = true;
            this.loggedInUser = this.googleuser.getEmail().split("@",1)[0];
            this.loggedIn = true;
            this.gsignin = true;
            var newUser:user = { username:this.loggedInUser,
              firstName:this.googleuser.getGivenName(),
              lastName:this.googleuser.iW,
              email:this.googleuser.getEmail()}

              this.userService.addUser(newUser).subscribe({
                error: (error)=> {
                  this.error = error.error.message;
                    if (error.error.errors != null) {
                      this.error = error.error.errors[0];
                    }
                  },
                next: (data) => {
                }
        
              });
            this.ngZone.run(()=>this.router.navigate(['home']));
          })
          
        }
      }


      googlesignout() {
        if(this.auth2.isSignedIn.get())
          {
          this.auth2.signOut().then(function () {
            console.log('User signed out.');
          });
          this.gsignin = false
        }
      }

}
