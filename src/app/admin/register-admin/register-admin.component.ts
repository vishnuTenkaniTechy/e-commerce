import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css'],
})
export class RegisterAdminComponent implements OnInit {
  //imagePreview: any = '';
  imagePreview: any = 'assets/imgs/default.jpg';

  image: any = 'default.jpg';
  constructor(private authSrv: AuthService) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.imagePreview = reader.result;
    //   };
    //   reader.readAsDataURL(this.image);
  }

  ngOnInit(): void {}
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
      'Admin'
    );
    console.log(form.value);
  }

  pickedImage(event: Event) {
    //console.log(event);

    const file = (event.target as HTMLInputElement).files[0];
    //this.postForm.patchValue({ image: file });
    console.log(file);
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
