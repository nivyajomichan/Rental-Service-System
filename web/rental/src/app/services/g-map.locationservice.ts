import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LocationService {
  constructor(private http: HttpClient) { }

  getLocation(term: string): Observable<any> {
    return this.http.get<any>(
      "https://maps.google.com/maps/api/geocode/json?address=" +
      term +
      "CA&sensor=false&key=AIzaSyCQGgf79Hb4eATPe8wgiPMSC-faO5F5IZs"
    );
  }
}
