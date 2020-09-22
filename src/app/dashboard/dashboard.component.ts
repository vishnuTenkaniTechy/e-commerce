import {
  Component,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ItemsService } from '../item/items.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AlertfyService } from '../alertfy.service';

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
  isLoading = false;
  constructor(
    private itemSrv: ItemsService,
    private authSrv: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private aletfy: AlertfyService
  ) {
    this.iteml = this.itemSrv.getOrderFromItems();
    console.log('cartItems', this.iteml);

    this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
    this.isLoading = true;
    this.itemsSub = this.itemSrv.getPostUpdateListener().subscribe(
      (postsData: any) => {
        this.isLoading = false;
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
    // console.log(this.userDetails);
  }

  filterItems(value: string) {
    if (value != '') {
      this.items = this.itemFilter.filter((item) => item.itemCate == value);
    }
    else {
      this.items = this.itemFilter
    }
    //console.log(this.items);
  }
  addToCart(item) {
    // item.itemCartStatus = true
    console.log(item);
    // tslint:disable-next-line: max-line-length
    this.itemSrv.addItemToCart(item.id, item.itemName, item.itemImg, item.itemPrice, item.itemDesc, 1, item.itemCate, item.itemQuantity, item.itemPrice).subscribe((resCart: any) => {

      if (resCart.message == 'add to cart successFully') {
        this.aletfy.success('Your item is added to cart');

      }
      this.aletfy.success('Your item is added to cart');
      this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
      this.increament(resCart.cart._doc.itemCartItem);

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
    //item.itemTotal += item.itemPrice;
    //item.itemNumber += 1;
    this.itemSrv.addtoCart(item).subscribe((resCart: any) => {
      console.log(resCart);
      this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
    }, err => {
      console.log(err);

    })

    //console.log('total', item.itemTotal);
    //this.itemSrv.storeItemToOrder(item);

  }
  decreament(item) {
    item.itemNumber == 1 ? item.itemNumber -= 1 : item.itemNumber
    if (item.itemNumber === 1 || item.itemNumber > 1) {
      if (item.itemNumber == 1) {
        item.itemTotal = item.itemPrice
      } else {
        item.itemTotal -= item.itemPrice;
      }
      item.itemNumber > 1 ? item.itemNumber -= 1 : item.itemNumber
      if (item.itemNumber != 0) {
        this.itemSrv.removetoCart(item.id).subscribe((resCart: any) => {
          console.log(resCart);
          this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
        }, err => {
          console.log(err);

        })
      }
      item.itemPrice;


      //this.itemSrv.storeItemToOrder(item);
    } else {
      item.itemNumber > 1 ? item.itemNumber -= 1 : item.itemNumber
      this.itemSrv.removetoCart(item.id).subscribe((resCart: any) => {
        console.log(resCart);
        this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
      }, err => {
        console.log(err);

      })

    }

  }

  Delete(itemId) {
    this.itemSrv.deleteItem(itemId);
    this.itemSrv.getAllItems(this.postPerPage, this.currentPage);

  }

  ngOnInit(): void { }
}
