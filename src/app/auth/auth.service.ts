import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { authModel } from './authModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';
  isUserAuthenticated = false;
  private tokenTimer: any;
  private userId: string;
  private isLikeValue: any;
  private userName: string;
  private userDetails: any;
  private authListner = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  register(
    userName: string,
    profile: File | string,
    email: string,
    password: string,
    role: string
  ) {
    let userData: any | FormData;
    if (profile === 'Object') {
      userData = new FormData();
      userData.append('userName', userName);
      userData.append('image', profile, userName);
      userData.append('email', email);
      userData.append('role', role);
      userData.append('password', password);
    } else {
      userData = {
        userName: userName,
        image: profile,
        email: email,
        role: role,
        password: password,
      };
    }

    this.http
      .post('http://localhost:3000/api/user/register', userData)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/Login']);
      });
  }

  //login
  login(email: string, password: string) {
    const authData: authModel = { email: email, password: password };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        likeValue: boolean;
        userName: string;
      }>('http://localhost:3000/api/user/login', authData)
      .subscribe((Response) => {
        console.log(Response);
        const token = Response.token;
        const expiresIntimer = Response.expiresIn;
        this.userId = Response.userId;
        this.userDetails = Response.userName;
        console.log(this.userDetails);

        if (token) {
          //this.getAuthTime(expiresIntimer);
          this.token = token;
          this.isUserAuthenticated = true;
          const now = new Date();
          const expiresInDate = new Date(now.getTime() + expiresIntimer * 1000);
          //this.saveAuthData(token, expiresInDate, this.userId, this.userName);
          //this.authListner.next(true);
          //this.router.navigate(['/']);
          alert('Successfully Login!');
        }
      });
  }
}
