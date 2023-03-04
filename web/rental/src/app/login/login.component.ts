import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  validCredentials:boolean = true
  gsignin:boolean = false
  private auth2:any;
  constructor(private formBuild:FormBuilder,private router:Router,private authService:AuthserviceService){

    gapi.load("auth2",() =>{
      this.auth2 = gapi.auth2.init({
        client_id: "533316988976-r8quh4cff2bhredgi4blfl38gje4l1s1.apps.googleusercontent.com"
      })
    })

    this.loginForm = this.formBuild.group({
      username: ['',[
        Validators.required
      ]],
      password: ['',[
        Validators.required
      ]]
    })
    
  }

  ngOnInit():void {


    
  }
  get username(){
    return this.loginForm.get('username');
  }
  get password(){
    return this.loginForm.get('password');
  }
  toSignup() {
    this.router.navigate(['signup'])
  }
  onsubmit()
  {
    console.log("submit");
    this.authService.authenticateUser(this.loginForm.value)
  
  }
  onSignIn() {
 
    this.authService.googlesignin();

  }



}
