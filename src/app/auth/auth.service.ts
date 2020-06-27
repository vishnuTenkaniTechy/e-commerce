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
  //private userName: string;
  private userDetails: any;
  private authListner = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

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
        //this.router.navigate(['/Login']);
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
          this.saveAuthData(token, expiresInDate, this.userId);
          this.authListner.next(true);
          //this.router.navigate(['/']);
          //alert('Successfully Login!');
        }
      });
  }

  autoAuthUserData() {
    const authUserInfo = this.getAuthData();
    if (!authUserInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authUserInfo.expiresInDate.getTime() - now.getTime();
    this.userId = authUserInfo.userId;
    if (expiresIn > 0) {
      this.token = authUserInfo.token;
      this.isUserAuthenticated = true;
      this.getAuthTime(expiresIn / 1000);
      this.authListner.next(true);
    }
  }
  getAuth() {
    return this.isUserAuthenticated;
  }

  getAuthStatusListner() {
    return this.authListner.asObservable();
  }
  getUserId() {
    return this.userId;
  }
  getUserName() {
    //console.log(this.userName);
    const authData = this.getAuthData();
    if (!authData) {
      return
    }
    // return this.userName = authData.userName;
  }

  getToken() {
    return this.token;
  }
  logOut() {
    this.token = null;
    this.isUserAuthenticated = false;
    this.userId = null;
    //this.userName = null;
    this.authListner.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private saveAuthData(
    token: string,
    expiresInDate: Date,
    userId: string,

  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiresInDate", expiresInDate.toISOString());
    localStorage.setItem("userId", userId);
    // localStorage.setItem("userName", userName);
  }
  private clearAuthData() {
    localStorage.clear();
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expiresInDate = localStorage.getItem("expiresInDate");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    if (!token || !expiresInDate) {
      return;
    }
    return {
      token: token,
      expiresInDate: new Date(expiresInDate),
      userId: userId,
      userName: userName,
    };
  }
  private getAuthTime(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }
}
