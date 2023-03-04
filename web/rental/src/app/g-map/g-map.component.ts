import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
//import {} from "googlemaps";

@Component({
  selector: 'g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.css']
})

export class GMapComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  @Input()
  options: google.maps.MapOptions = {
    center: {lat: 40, lng: -20},
    zoom: 11
  };
  constructor(httpClient: HttpClient, private bsModalRef: BsModalRef) {    
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCQGgf79Hb4eATPe8wgiPMSC-faO5F5IZs', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
        
  }

  
  ngOnInit(): void {
  }
}

