import {
  Component,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ItemsService } from '../item/items.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  totalPosts = 0;
  postPerPage = 6;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  items: any[] = [];
  itemFilter: any[] = [];
  userDetails: any = null;
  private itemsSub: Subscription;
  constructor(
    private itemSrv: ItemsService,
    private authSrv: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
    this.itemsSub = this.itemSrv.getPostUpdateListener().subscribe(
      (postsData: any) => {
        //  this.isLoading = false;
        this.totalPosts = postsData.maxPostCout;
        this.items = postsData.items;
        console.log(postsData);
        this.itemFilter = this.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngAfterViewChecked() {
    this.userDetails = this.authSrv.getUserDetails();
    this.cdr.detectChanges();
    console.log(this.userDetails);
  }

  filterItems(value: string) {
    if (value != '') {
      this.items = this.itemFilter.filter((item) => item.itemCate == value);
    }
    console.log(this.items);
  }

  ngOnInit(): void {}
}
