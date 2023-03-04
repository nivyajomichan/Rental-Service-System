import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { complaint } from './complaint';
import { product } from './product';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {}

  book(uname: string, prodid: number):Observable<any> {
    return this.http.get<boolean>(environment.baseUrl+"/cart/book/"+uname+ "/"+prodid);
  }
  getcart(uname:string):Observable<any> {
    return this.http.get<product[]>(environment.baseUrl+"/cart/"+uname);
  }
  return(uname: string,prodid:number):Observable<any>{
    return this.http.get<product[]>(environment.baseUrl+"/cart/return/"+uname+ "/"+prodid);
  }

  prev_book(uname:string):Observable<any> {
    return this.http.get<product[]>(environment.baseUrl+"/cart/prev/"+uname);
  }

  getrecommendations(uname:string):Observable<any>{
    return this.http.get<product[]>(environment.baseUrl+"/cart/rec/"+uname);
  }

  rate(pid:number,rating:number):Observable<any>{
    return this.http.get<boolean>(environment.baseUrl+"/cart/rate/"+pid+"/"+rating);
  }

  complaint(comp:complaint):Observable<any>{
    return this.http.post<boolean>(environment.baseUrl+"/cart/complaint",comp);
  }

  getcomplaint():Observable<any>{
    return this.http.get<complaint[]>(environment.baseUrl+"/home/comp");
  }
}
