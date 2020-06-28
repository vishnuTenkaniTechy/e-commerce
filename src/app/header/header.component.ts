import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewChecked {
  private authListnerSubs: Subscription;
  isUserAuthenticated = false;
  userDetails: any = null;
  constructor(private auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.auth.getAuth();

    this.authListnerSubs = this.auth
      .getAuthStatusListner()
      .subscribe((isUserAuth) => {
        this.isUserAuthenticated = isUserAuth;
      });
  }

  ngAfterViewChecked() {
    this.userDetails = this.auth.getUserDetails();
    this.cdr.detectChanges();
    console.log(this.userDetails);
  }
  onLogout() {
    this.auth.logOut();
  }
}
