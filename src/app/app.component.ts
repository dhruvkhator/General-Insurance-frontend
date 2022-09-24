import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'User';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'general_insurance';

  addForm: FormGroup;
  submitted: boolean = false;
  user : User = new User();

  constructor(private formBuilder: FormBuilder, private userService: UserService){}

  createUser(){
    this.userService.createUser(this.user).subscribe();
  }

  onSubmit() {
    this.submitted = true;
    this.createUser();
  }
}
