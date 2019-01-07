import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  response: any;
  auth_token: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    // const formModel = this.prepareSave();
    this.authService.login(this.loginForm.value)
      .subscribe(data => {
        this.auth_token = data.success.token;
        localStorage.setItem("auth_token", this.auth_token); //Store auth token and user details in localstorage
        localStorage.setItem("auth_user", JSON.stringify(data.success.user));
         this.router.navigate(['dashboard']);
      });
  }

}
