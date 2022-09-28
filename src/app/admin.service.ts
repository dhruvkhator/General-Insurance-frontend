import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'Admin';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = "http://localhost:3000/admin";
  constructor(private http_ser: HttpClient) { }

  getAdminbyId(id: number): Observable<Admin[]>{
    return this.http_ser.get<Admin[]>(this.baseUrl+'/?admin_id='+id);
  }
}
