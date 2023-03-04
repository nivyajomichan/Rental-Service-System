import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,FormsModule, ReactiveFormsModule,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { user } from '../user';
import Validation from '../validations'
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  
  signUpForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl(''),
    confirmPassword:  new FormControl(''),
    email: new FormControl(),
    age: new FormControl(),
    gender: new FormControl(),
    contactnumber: new FormControl(),
    pincode: new FormControl(),

  })
  formSubmitted: boolean;
  error:string;
  nomatch:boolean = false;
  status:boolean=false;
  constructor(private userService:UserserviceService,private route:Router,private formbuilder:FormBuilder) {
    this.formSubmitted = false;
    this.error = '';
  }

  ngOnInit(): void {
    this.signUpForm = this.formbuilder.group({
      firstname:['',[
        Validators.required
      ]],
      lastname:['',[
        Validators.required
      ]],
      password:['',[
        Validators.required,Validators.minLength(8)
      ]],
      confirmPassword:['',[
        Validators.required
      ]],
      email:['',[Validators.email]],
     age:['',[Validators.required,Validators.min(12),Validators.max(150)]],
    contactnumber:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    pincode:['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }
    )
   }

   get f(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }
  get firstname() {
    return this.signUpForm.get('firstname');
  }
  get lastname() {
    return this.signUpForm.get('lastname');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
  get age() {
    return this.signUpForm.get('age');
  }
  get contactnumber() {
    return this.signUpForm.get('contactnumber');
  }
  get pincode()
  {
    return this.signUpForm.get('pincode');
  }
  get email()
  {
    return this,this.signUpForm.get('email');
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.signUpForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    console.log(invalid);
    return invalid;
}

  onSubmit(){

    if (this.signUpForm.invalid) {
      this.findInvalidControls();
      return;
    }
      this.formSubmitted = true;

      let username = this.signUpForm.value['email'].split("@",1);

  
      const newUser:user = { username: username[0], 
                        firstName: this.signUpForm.value['firstname'], 
                        lastName: this.signUpForm.value['lastname'], 
                        password: this.signUpForm.value['password'],
                        age: this.signUpForm.value['age'],
                        email:this.signUpForm.value['email'],
                        pincode:this.signUpForm.value['pincode'],
                        contact:this.signUpForm.value['contactnumber'],
  
                       };
                      //  console.log(newUser),
      // this.userService.addUser(newUser).subscribe( data => {
      //     // console.log("new user added: "+data);
      //     // this.userService.userList.push(newUser);
      //     // console.log(this.userService.userList);
      //     this.status=false;
      //     this.route.navigate(['login'])
      // },
      // (error:any)=>{
      //   this.status=true;
      //   this.error = error.error.message;
      //     if (error.error.errors != null) {
      //       this.error = error.error.errors[0];
      //     }
      // },
      // );

      this.userService.addUser(newUser).subscribe({
        error: (error)=> {
          this.status=true;
          this.error = error.error.message;
            if (error.error.errors != null) {
              this.error = error.error.errors[0];
            }
          },
        next: (data) => {
          this.status=false;
          this.route.navigate(['login'])
        }

      });
      this.signUpForm.reset();
  
    }

}
