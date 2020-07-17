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
  iteml: any;
  private itemsSub: Subscription;
  tempItem: any[] = [];
  constructor(
    private itemSrv: ItemsService,
    private authSrv: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.iteml = this.itemSrv.getOrderFromItems();
    console.log('cartItems', this.iteml);

    this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
    this.itemsSub = this.itemSrv.getPostUpdateListener().subscribe(
      (postsData: any) => {
        //  this.isLoading = false;
        this.totalPosts = postsData.maxPostCout;
        this.items = postsData.items;

        console.log(this.items);
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
    //console.log(this.items);
  }
  addToCart(item) {
    //item.itemCartStatus = true
    console.log(item);
    this.itemSrv.addtoCart(item.id, 1, item.itemPrice, true).subscribe((resCart: any) => {
      console.log(resCart);
      this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
    }, err => {
      console.log(err);

    })
    // let temp = this.tempItem.findIndex((i) => i.id == item.id)

    // if (temp == -1) {
    //   this.tempItem.push(item)
    // }

    //console.log('temp', this.tempItem, temp);
    ///this.itemSrv.storeItemToOrder(this.tempItem);
  }

  increament(item) {
    item.itemTotal += item.itemPrice;
    item.itemNumber += 1;
    this.itemSrv.addtoCart(item.id, item.itemNumber, item.itemTotal, true).subscribe((resCart: any) => {
      console.log(resCart);
      this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
    }, err => {
      console.log(err);

    })

    //console.log('total', item.itemTotal);
    //this.itemSrv.storeItemToOrder(item);

  }
  decreament(item) {
    if (item.itemNumber === 1 || item.itemNumber > 1) {
      item.itemTotal -= item.itemPrice;
      item.itemNumber > 1 ? item.itemNumber -= 1 : item.itemNumber
      if (item.itemNumber !== 1) {
        this.itemSrv.removetoCart(item.id, item.itemNumber, item.itemTotal, true).subscribe((resCart: any) => {
          console.log(resCart);
          this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
        }, err => {
          console.log(err);

        })
      } else {
        item.itemPrice;
        this.itemSrv.removetoCart(item.id, item.itemNumber, item.itemPrice, false).subscribe((resCart: any) => {
          console.log(resCart);
          this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
        }, err => {
          console.log(err);

        })
      }

      //this.itemSrv.storeItemToOrder(item);
    } else {
      item.itemCartStatus = false;
    }

  }

  ngOnInit(): void { }
}
