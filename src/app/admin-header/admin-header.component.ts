import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Admin } from 'Admin';
import { LocalStorageService } from 'ngx-webstorage';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  adminLoggedIn: boolean = false;
  submitted:boolean = false;
  validateAdmin: FormGroup;
  admin: Admin = new Admin();

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private adminServ: AdminService,
    public storage : LocalStorageService, public router: Router) {}

  ngOnInit(): void {
    this.validateAdmin = this.formBuilder.group({
      l_id:['',Validators.required,],
      l_pwd: ['',Validators.required]
    });
  }

  onLogin(){
    this.submitted = true;
    console.log(this.validateAdmin)
    if(this.validateAdmin.invalid){
      return;
    }
    else{
      this.submitted=false; 
      this.verifyAdmin(this.validateAdmin.controls['l_id'].value);
    }
  }

  verifyAdmin(id: number){
    this.adminServ.getAdminbyId(id).subscribe(data =>{
      console.log(data)
      if(this.validateAdmin.controls['l_pwd'].value == data[0].password){
        console.log("he")
        this.adminLoggedIn=true;
        this.storage.store("isAdminLoggedIn",true);
        this.storage.store("a_id",data[0].admin_id);
        this.modalService.dismissAll();
    }})
  }

  open(content: any) {
    this.modalService.open(content);
  }
  close(){
    this.modalService.dismissAll();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  onlogout(){
  console.log('logout');
    this.adminLoggedIn=false;
    this.storage.store("isAdminLoggedIn",false);
    this.storage.store("a_id","");
    this.modalService.dismissAll();
  }

}
