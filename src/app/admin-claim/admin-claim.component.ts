import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Claim } from 'Claim';
import { Insurance } from 'Insurance';
import { LocalStorageService } from 'ngx-webstorage';
import { ClaimService } from '../claim.service';
import { InnsuranceService } from '../innsurance.service';

@Component({
  selector: 'app-admin-claim',
  templateUrl: './admin-claim.component.html',
  styleUrls: ['./admin-claim.component.scss']
})
export class AdminClaimComponent implements OnInit {

  insurance_pending: Insurance[] = [];
  insurance_approved: Insurance[]= [];
  insurance_rejected: Insurance[] = [];
  insurance: Insurance[];
  start_date : Date;
  claim_date: Date;
  d1: Date;
  dur: number;

  claim : Claim = new Claim();



  constructor(private router: Router, public storage : LocalStorageService, private insServ : InnsuranceService, private claimServ
    :ClaimService) { }

  ngOnInit(): void {
    if(!this.storage.retrieve("isAdminLoggedIn")){
      alert("Please Log-In to continue");
      this.router.navigate(["/admin"]);
    }
    console.log(this.insurance_pending);
    this.getInsuranceList();
  }



  getInsuranceList(){
    this.insServ.getAllIns().subscribe(data =>{
      this.insurance = data;
      this.dividingClaim(this.insurance);
     
    })
  }

  dividingClaim(i: Insurance[]){
      i.forEach(e => {
        console.log(e)
        if(e?.claimIns?.claim_status == 'pending'){
          try {
            this.insurance_pending.push(e);
            console.log(this.insurance_pending)
          } catch (error) {
            console.log(error);
          }
          
        }
        else if(e?.claimIns?.claim_status == 'approved'){
          this.insurance_approved?.push(e);
        }
        else if(e?.claimIns?.claim_status == 'rejected'){
          this.insurance_rejected?.push(e)
        }
     });
  }

  onApprove(iv: number, tca: number, reason: string, cid: number, pno: number, pp: number, pd:Date, sd: string, cd:string){
    this.d1 = new Date(pd);
    this.start_date = new Date(sd);
    this.claim_date = new Date(cd);
    this.dur = this.start_date.getTime() - this.d1.getTime();
    //console.log(this.dur);
    this.dur = (this.dur / (1000 * 3600 * 24)) / 365;
    //console.log(this.dur)


    if (this.dur >= 0.5 && this.dur <= 1) {
      pp = pp - pp * 5 / 100;
    }
    else if (this.dur > 1 && this.dur <= 2) {
      pp = pp - pp * 15 / 100;
    }
    else if (this.dur > 2 && this.dur <= 3) {
      pp = pp - pp * 20 / 100;
    }
    else if (this.dur > 3 && this.dur <= 4) {
      pp = pp - pp * 30 / 100;
    }
    else if (this.dur > 4 && this.dur <= 5) {
      pp = pp - pp * 40 / 100;
    }
    else if (this.dur > 5) {
      pp = pp - pp * 50 / 100;
    }

    let y = this.claim_date.getTime() - this.start_date.getTime();
    y = (y/1000*3600*24)/365;

    if(y>=0 && y<=1 ){}
    else if(y>1 && y<=2){
      pp = pp - 15*pp/100;
    }
    else if(y>2&& y<=3){
      let p1 = pp - 15*pp/100;
      pp = p1 - 15*p1/100;
    }



    let amount = 0;
    if(reason == 'accident'){
      amount = pp*75/100;
    }
    else if(reason == 'theft'){
      amount = pp*50/100;
    }
    else if(reason == 'natural'){
      amount = pp*80/100;
    }
    else if(reason == 'manmade'){
      amount = pp*65/100;
    }

    tca+=amount;

    this.claim.amount = amount;
    this.claim.claim_status = 'approved';

    this.claimServ.updateClaimbyId(cid,this.claim).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  onReject(cid: number){
    this.claim.amount = 0;
    this.claim.claim_status= "rejected";

    this.claimServ.updateClaimbyId(cid,this.claim).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }
  

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
