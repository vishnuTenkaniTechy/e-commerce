import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  constructor(private authSrv: AuthService) { }
  ngOnInit() {
    this.authSrv.autoAuthUserData();

  }
}
