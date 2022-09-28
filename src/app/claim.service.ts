import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from 'Claim';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  
  private baseUrl = "http://localhost:3000/claim";
  constructor(private http_ser: HttpClient) { }

  createClaim(claim: Claim): Observable<object>{
    return this.http_ser.post(this.baseUrl,claim);
  }

  getAllClaim(): Observable<Claim[]>{
    return this.http_ser.get<Claim[]>(this.baseUrl);
  }

  updateClaimbyId(id: number, claim: Claim): Observable<object>{
    return this.http_ser.put(this.baseUrl+'/?claim_id='+id,claim);
  }
}
