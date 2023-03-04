import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { numbers } from '@material/dialog';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  title: string | null = null;

  id:number = 0;

  rateForm:FormGroup =new FormGroup({
    rating: new FormControl('')
  }) ;

  constructor(public ratingmodalRef: MdbModalRef<RatingComponent>,private formbuilder:FormBuilder,
    private bookingservice: BookingService) { }

  ngOnInit(): void {

    this.rateForm = this.formbuilder.group({
      rating: ['',[
        Validators.required,Validators.min(0),Validators.max(5)
      ]]
    })
  }

  get rating()
  {
    return this.rateForm.get('rating');
  }

  onrateSubmit(pid:number)
  {
    let rate = this.rateForm.value['rating']
    this.bookingservice.rate(pid,rate).subscribe({
      next: (data) => {
        this.ratingmodalRef.close();
        // console.log(data) 
      },
      error: (error) => {
        console.log(error);

      }
    });
  }

}
