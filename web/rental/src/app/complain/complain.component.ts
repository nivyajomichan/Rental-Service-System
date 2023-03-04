import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { BookingService } from '../booking.service';
import { complaint } from '../complaint';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {

  id:number = 0;

  own:string = "";

  complainForm:FormGroup = new FormGroup({
    rating: new FormControl('')
  });

  constructor(public complainmodalRef: MdbModalRef<ComplainComponent>,private formbuilder:FormBuilder,
    private bookingservice: BookingService) { }

  ngOnInit(): void {

    this.complainForm = this.formbuilder.group({
      complaint: ['',[
        Validators.required,Validators.maxLength(250)
      ]]
    })
  }

  get complaint()
  {
    return this.complainForm.get('complaint');
  }

  oncomplSubmit(id:number,own:string)
  {
    let com:complaint = {
      comptext: this.complainForm.value['complaint'],
      owname: own,
      prodid:id
    }

    this.bookingservice.complaint(com).subscribe({
      next: (data) => {
        this.complainmodalRef.close(); 
      },
      error: (error) => {
        console.log(error);

      }
    });

  }


}
