import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:3000/users";
  constructor(private http_ser: HttpClient) { }

  createUser(user: User): Observable<object>{
    return this.http_ser.post(this.baseUrl, user);
  }

  getAllUsers(): Observable<User[]>{
    return this.http_ser.get<User[]>(this.baseUrl);
  }

  getUserByEmail(email: string): Observable<User[]>{
    return this.http_ser.get<User[]>(this.baseUrl+'/?email='+email);
  }
  
}
