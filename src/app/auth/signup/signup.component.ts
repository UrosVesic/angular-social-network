import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { SignupRequestPaylaod } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupRequestPayload: SignupRequestPaylaod



  constructor(private authService:AuthService) { 
    this.signupForm = new FormGroup({
      username: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
    this.signupRequestPayload={
      username:'',
      email:'',
      password:''
    }
  }

  ngOnInit(): void {
    
  }

  signup(){
    this.signupRequestPayload.email = this.signupForm.get('email')!.value;
    this.signupRequestPayload.username = this.signupForm.get('username')!.value;
    this.signupRequestPayload.password = this.signupForm.get('password')!.value;
    this.authService.signup(this.signupRequestPayload).subscribe(data=>{
      console.log(data);
    })
  }

}
