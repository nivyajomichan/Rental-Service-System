import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router,private authService:AuthserviceService) { }
  isLoggedIn:boolean = false
  loggedInuser:string = "";
  isUser:boolean = false;
  isAdmin:boolean = false;
  ngOnInit(): void {
  }
  loggedIn():boolean {
    if(this.authService.loggedIn){
      this.isLoggedIn = true;
      this.loggedInuser = this.authService.loggedInUser;
      this.isUser  = this.authService.isUser;
      this.isAdmin = this.authService.isAdmin;
      return true
    }
    else{
      this.isLoggedIn = false;
      return false;
    }
  }
  clicked(){
    this.authService.logout();
  }

}
