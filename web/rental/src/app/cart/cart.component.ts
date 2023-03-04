import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { BookingService } from '../booking.service';
import { product } from '../product';
import { RatingComponent } from '../rating/rating.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ComplainComponent } from '../complain/complain.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  ratingmodalRef: MdbModalRef<RatingComponent> | null = null;
  complainmodalRef: MdbModalRef<ComplainComponent> | null = null;

  cart:product[] = [];
  prev_bookings:product[] = [];
  showrate:boolean = false;
  showcompl:boolean = false;
  rateForm:FormGroup =new FormGroup({
    rating: new FormControl('')
  }) ;
  complainForm:FormGroup = new FormGroup({
    rating: new FormControl('')
  });
  formBuild: any;

  constructor(private bookingservice: BookingService,
    public router: Router,
    private authService: AuthserviceService,
    private modalService: MdbModalService,
    private formbuilder:FormBuilder) {

      
     }

  ngOnInit(): void {

    this.rateForm = this.formbuilder.group({
      rating: ['',[
        Validators.required,Validators.min(0),Validators.max(5)
      ]]
    })

    this.complainForm = this.formbuilder.group({
      complaint: ['',[
        Validators.required,Validators.maxLength(250)
      ]]
    })

    

    this.bookingservice.prev_book(this.authService.loggedInUser).subscribe({
      next: (data) => {
        // console.log(data)
        this.prev_bookings = data 
      },
      error: (error) => {
        console.log(error);

      }
    });

    this.update()
  }

  get rating()
  {
    return this.rateForm.get('rating');
  }

  get complaint()
  {
    return this.complainForm.get('complaint');
  }

  return(item:product)
  {
    let id:number = item.id!;
    this.bookingservice.return(this.authService.loggedInUser,id).subscribe({
      next: (data) => {
        // console.log(data)
        this.update() 
      },
      error: (error) => {
        console.log(error);

      }
    });
  }

  clickr(item:product)
  {
    let pid:number = item.id!;
    this.ratingmodalRef = this.modalService.open(RatingComponent,{data:{id:pid,title:item.productName}})
  }

  clickc(item:product)
  {
    let pid:number = item.id!;
    this.complainmodalRef = this.modalService.open(ComplainComponent,{data:{id:pid,title:item.productName,own:item.owner}})
  }

  contact()
  {
    this.router.navigate(['chat'])
  }

  update()
  {
    this.bookingservice.getcart(this.authService.loggedInUser).subscribe({
      next: (data) => {
        this.cart = data;
        // console.log(data)  
      },
      error: (error) => {
        console.log(error);

      }
    });
  }


}
