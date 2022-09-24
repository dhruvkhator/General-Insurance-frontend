import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  addUser: FormGroup;
  submitted: boolean = false;
  user : User = new User();

  validateUser: FormGroup;
  l_submitted: boolean = false;


  ngOnInit(): void {
    this.addUser= this.formBuilder.group({
      uname:[],
      email:[],
      pwd:[],
      contact:[],
      addr:[],
      dob:[]
    });

    this.validateUser = this.formBuilder.group({
      l_email:[],
      l_pwd: []
    });
  }

  closeResult = '';

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private userService: UserService) {}

  open(content: any) {
    this.modalService.open(content);
  }
  close(){
    this.modalService.dismissAll;
  }

  createUser(){
    this.userService.createUser(this.user).subscribe();
  }

  onSignup() {
    this.submitted = true;
    this.createUser();
  }


  onLogin(){
    this.l_submitted = true;
    this.verifyUser;
  }

  verifyUser(email: string){
    this.userService.getUserByEmail(email).subscribe();
  }
  
}
