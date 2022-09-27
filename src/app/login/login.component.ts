import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from 'User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateUser: FormGroup;
  submitted: boolean = false;

  loggedIn: boolean = false;

  user: User = new User();


  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private userService: UserService,
     public storage : LocalStorageService, public router: Router) {}
  ngOnInit(): void {
    this.validateUser = this.formBuilder.group({
      l_email:['',[Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      l_pwd: ['',Validators.required]
    });
  }


  open(content: any) {
    this.modalService.open(content);
  }
  close(){
    this.modalService.dismissAll;
  }

  onlogout(){
    console.log('logout');
    this.loggedIn=false;
    this.storage.store("isLoggedIn",false);
    this.storage.store("email","");
    this.storage.store("uname","");
    this.modalService.dismissAll();
  }

  //login
  onLogin(){
    this.submitted = true;
    console.log(this.validateUser)
    if(this.validateUser.invalid){
      return;
    }
    else{
      this.submitted=false; 
      this.verifyUser(this.validateUser.controls['l_email'].value);
    }
  }

  verifyUser(email: string){
    this.userService.getUserByEmail(email).subscribe(data=>{
      //console.log(data[0]['pwd']);
      if(this.validateUser.controls['l_pwd'].value == data[0].password){
        this.loggedIn=true;
        this.storage.store("isLoggedIn",true);
        this.storage.store("email",data[0].email);
        this.storage.store("uname",data[0].name);
        this.modalService.dismissAll();
      } 
    });
  }

  profile(){
    this.router.navigate(["/profile"]);
  }
  
}
