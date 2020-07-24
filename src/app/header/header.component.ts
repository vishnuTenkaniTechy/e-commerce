import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ItemsService } from '../item/items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewChecked {
  private authListnerSubs: Subscription;
  isUserAuthenticated = false;
  userDetails: any = null;
  private itemsSub: Subscription;
  totalPosts = 0;
  postPerPage = 6;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  items: any[] = [];
  constructor(private auth: AuthService, private cdr: ChangeDetectorRef, private itemSrv: ItemsService) { }

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
    //this.getCartItem();
    this.cdr.detectChanges();

    //console.log(this.userDetails);
  }
  onLogout() {
    this.auth.logOut();
  }
  private getCartItem() {

    this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
    this.itemsSub = this.itemSrv.getPostUpdateListener().subscribe(
      (postsData: any) => {
        //  this.isLoading = false;
        //this.totalPosts = postsData.maxPostCout;
        this.items = postsData.items;


        //this.itemFilter = this.items;
        this.items = this.items.filter((item) => item.itemCart == true);
        //this.subTotal = 0
        this.items.map((item) => {
          ///this.subTotal += item.itemTotal;
          //console.log('vv', item, this.subTotal);

        })
        ///console.log(this.items);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
