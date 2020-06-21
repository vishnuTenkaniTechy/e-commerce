import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {}

  onLoginForm(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.authSrv.login(form.value.email, form.value.password);
  }
}
