import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { product } from './product';

@Injectable({
  providedIn: 'root'
})
export class SearchserviceService {

  constructor(private http: HttpClient) { }

  getProducts():Observable<any> {
    return this.http.get<product[]>(environment.baseUrl+"/home/all");
  }
  getProductByCategory(id:string):Observable<any> {
    return this.http.get<product[]>(environment.baseUrl+"/home/category/"+id);
  }
  getProductByRating(id:number):Observable<any> {
    return this.http.get<product[]>(environment.baseUrl+"/home/rating/"+id);
  }

  getProductByBrand(id:string):Observable<any> {
    return this.http.get<product[]>(environment.baseUrl+"/home/brand/"+id);
  }
}
