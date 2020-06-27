import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  imagePreview: any = 'assets/imgs/default.jpg';

  image: any;
  constructor(private authSrv: AuthService) { }

  ngOnInit(): void { }
  onSignupForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //this.authService.createUser(form.value.email, form.value.password)
    this.authSrv.register(
      form.value.userName,
      this.image,
      form.value.email,
      form.value.password,
      'User'
    );
    console.log(form.value);
  }

  pickedImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    //this.postForm.patchValue({ image: file });
    //this.postForm.get("image").updateValueAndValidity();
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.image);
    console.log(this.image);
  }
}
