import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  register(userName: string, profile: File, email: string, password: string) {
    const userData = new FormData();
    userData.append("userName", userName);
    userData.append("image", profile, userName);
    userData.append("email", email);
    userData.append("role", "user");
    userData.append("password", password);
    this.http.post("http://localhost:3000/api/user/register", + userData).subscribe((response) => {
      console.log(response);

    })


  }
}
