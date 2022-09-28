import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Obj } from '@popperjs/core';
import { Insurance } from 'Insurance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InnsuranceService {
  private baseUrl = "http://localhost:3000/insurance";
  constructor(private http_ser: HttpClient) { }

  createIns(insurance: Insurance): Observable<object>{
    return this.http_ser.post(this.baseUrl,insurance);
  }

  getAllIns(): Observable<Insurance[]>{
    return this.http_ser.get<Insurance[]>(this.baseUrl);
  }

  getInsByNo(pno:number): Observable<Insurance[]>{
    return this.http_ser.get<Insurance[]>(this.baseUrl+'/?policy_no='+pno);
  }


  // getActiveIns(): Observable<Insurance[]>{
  //   return this.http_ser.get<Insurance[]>(this.baseUrl+'/'+)
  // }
}
