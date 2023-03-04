import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { GMapComponent } from '../g-map/g-map.component';
import { product } from '../product';
import { SearchserviceService } from '../searchservice.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LocationService } from '../services/g-map.locationservice';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from '../data';
import { environment } from 'src/environments/environment';

import { BookingService } from '../booking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable({ providedIn: 'root' })
export class HomeComponent implements OnInit {
  paymentHandler: any = null;
  SearchKey: string = "";
  BrandKey: string = "";
  loggedInuser:string = "";
  productList: product[] = [];
  isLoggedIn: boolean = false;
  isUser:boolean = false;
  showrec:boolean = false;
  RateKey: number = 0;
  searchText: string = "";
  address: any = null;
  options = ['Rating 1 & above', 'Rating 2 & above', 'Rating 3 & above', 'Rating 4 & above']
  bsModalRef?: BsModalRef;
  mapOptions = {
    center: { lat: 40, lng: -20 },
    zoom: 4
  };

  constructor(
    private http: HttpClient,
    public router: Router,
    private locationService: LocationService,
    private authService: AuthserviceService,
    private searchservice: SearchserviceService, private dialog: MatDialog, private modalService: BsModalService,
    private bookingservice: BookingService) {
    // if (authService.loggedIn) {
    //   this.loggedIn = true;
    // }
  }

  sendMail(d: data): Observable<any> {
    console.log(d);
    console.log(environment.baseUrl + "/send/Mail")
    return this.http.post<boolean>(environment.baseUrl + "/send/Mail", d);
  }

  openGmaps(term: string) {
    this.locationService.getLocation(term).subscribe({
      next: (data) => {
        this.address = data;
        // console.log(this.address)
        // console.log("Response Lat Long")
        // console.log(this.address.results[0].geometry.location.lat)
        // console.log(this.address.results[0].geometry.location.lng)
        this.openMaps(this.address.results[0].geometry.location.lat, this.address.results[0].geometry.location.lng)
      }
    });
  }
  openMaps(lat: number, long: number) {
    const options = {
      center: {
        lat: lat,
        lng: long
      },
      zoom: 10
    }
    this.bsModalRef = this.modalService.show(GMapComponent);
    this.bsModalRef.content.options = options;
  }
  ngOnInit(): void {
    this.searchservice.getProducts().subscribe({
      next: (data) => {
        this.productList = data;
        // console.log(data)  
      },
      error: (error) => {
        console.log(error);

      }
    });
    this.invokeStripe();
  }

  makePayment(amount: any) {
    let isPresent:boolean = false;
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KmST7DfkwakJlGdB2G2VHswVU5cGa1zWYdMGh2hgwVMsQyOgT0dgrIgdBrR5KRQxgPYL9zNhvItfQ50TfyHzxnl005YXFQU0N',
      locale: 'auto',
      token: function (stripeToken: any) {
        //console.log(stripeToken);
        alert('Payment Successful!');
        isPresent=true;
      },
    });
    paymentHandler.open({
      name: 'Enter Payment Details',
      // description: 'Enter Details',
      amount: amount * 100,
    });

    var newData: data = {
      recipient: "cmanisha96@gmail.com",
      msgBody: "Payment Successful using Stripe. Team Acquerir!!",
      subject: "Payment Notification"
    }

    // if (isPresent=true) {
      // this.sendMail(newData);
      this.sendMail(newData).subscribe({
        error: (error) => {
          console.log(error)
        },
        next: (data) => {
          console.log(data)
        }

      });
    // }

  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51H7bbSE2RcKvfXD4DZhu',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  searchByCategory() {
    this.RateKey = 0;
    this.BrandKey = "";
    this.searchservice.getProductByCategory(this.SearchKey).subscribe({
      next: (data) => {
        this.productList = data;  
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  refresh() {
    this.SearchKey = "";
    this.RateKey = 0;
    this.BrandKey = "";
    this.searchservice.getProducts().subscribe({
      next: (data) => {
        this.productList = data; 
      },
      error: (error) => {
        console.log(error);

      }
    });
  }
  searchByRating() {
    this.SearchKey = "";
    this.BrandKey = "";
    this.searchservice.getProductByRating(this.RateKey).subscribe({
      next: (data) => {
        this.productList = data;
        // console.log(data)  
      },
      error: (error) => {
        console.log(error);

      }
    });
  }
  searchByBrand() {
    this.SearchKey = "";
    this.RateKey = 0;
    this.searchservice.getProductByBrand(this.BrandKey).subscribe({
      next: (data) => {
        this.productList = data;
        // console.log(data)  
      },
      error: (error) => {
        console.log(error);

      }
    });
  }

  // openMaps(lat: number, long: number) {
  //   const options = {
  //     center: {
  //       lat: lat,
  //       lng: long
  //     },
  //     zoom: 10
  //   }
  //   //console.log(options)
  //   this.bsModalRef = this.modalService.show(GMapComponent);
  //   this.bsModalRef.content.options = options;
  //   // const dialogRef = this.dialog.open(GMapComponent);
  // }
  getrec()
  {
    this.bookingservice.getrecommendations(this.loggedInuser).subscribe({
      next: (data) => {
        this.productList = data;
        // console.log(data)  
      },
      error: (error) => {
        console.log(error);

      }
    });
  }
  book(id:number) {

    // this.bookingservice.book(this.loggedInuser,id);
    this.bookingservice.book(this.loggedInuser,id).subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigate(['cart'])  
      },
      error: (error) => {
        console.log(error);

      }
    });

  }
  loggedIn():boolean {
    if(this.authService.loggedIn){
      this.isLoggedIn = true;
      this.loggedInuser = this.authService.loggedInUser;
      this.isUser = this.authService.isUser;
      // console.log(this.authService.isUser)
      return true
    }
    else{
      this.isLoggedIn = false;
      return false;
    }
  }


}


