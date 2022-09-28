import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Insurance } from 'Insurance';
import { LocalStorageService } from 'ngx-webstorage';
import { InnsuranceService } from '../innsurance.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  insurance: Insurance[];
  ia : Insurance[]= [];
  iia: Insurance[] = [];
  start_date: Date = new Date();
  d1: Date;

  constructor(private router: Router, public storage : LocalStorageService, private insServ : InnsuranceService) { }

  ngOnInit(): void {
    if(!this.storage.retrieve("isAdminLoggedIn")){
      alert("Please Log-In to continue");
      this.router.navigate(["/admin"]);
    }

    this.getInsuranceList();
  }

  getInsuranceList(){
    this.insServ.getAllIns().subscribe(data => 
      {
        this.insurance = data

        console.log(this.insurance);
        this.insurance.forEach(e=>{
          if(this.verifyPolicyDuration(e)){
            this.iia.push(e)
          }
          else{
            this.ia.push(e);
          }
          console.log(this.ia);
          console.log(this.iia);
        })
      });
  }

  verifyPolicyDuration(i:Insurance){
 
    let s_d = i.start_date;
      let d = s_d.slice(0,4);
      let d_n = Number(d);
      //console.log(s_d+" "+ d+ " "+ d_n)

      d_n += i.duration;
      d = String(d_n);
      s_d = s_d.replace(s_d.slice(0,4),d);

      //console.log(s_d+" "+ d+ " "+ d_n)

      this.d1 = new Date(s_d);
      let time = this.d1.getTime() - this.start_date.getTime();
      if(time<0){
        return true;
      }

      return false;
  }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
