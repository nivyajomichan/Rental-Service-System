import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { complaint } from '../complaint';

@Component({
  selector: 'app-viewcomp',
  templateUrl: './viewcomp.component.html',
  styleUrls: ['./viewcomp.component.css']
})
export class ViewcompComponent implements OnInit {

  cart:complaint[] = []

  constructor(private bookingservice: BookingService) { }

  ngOnInit(): void {

    this.bookingservice.getcomplaint().subscribe({
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
