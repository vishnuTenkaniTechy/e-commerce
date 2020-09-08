import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ItemsService } from '../items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalPosts = 0;
  postPerPage = 6;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  items: any[] = [];
  itemFilter: any[] = [];
  userDetails: any = null;
  subTotal: number = 0;
  userId: any;
  //iteml: any;
  private itemsSub: Subscription;
  constructor(
    private itemSrv: ItemsService,
    private authSrv: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getCartItem();

  }
  private getCartItem() {

    this.itemSrv.getCartItem().subscribe((cartData: any) => {
      this.items = cartData.test,
        this.userDetails = this.authSrv.getUserDetails();
      this.items = this.items.filter((s) => s.itemCartUser === this.userDetails._id);
      this.subTotal = 0;
      this.items.map((item) => {
        this.subTotal += item.itemtotal;
        //console.log('vv', item, this.subTotal);
      })
      //console.log('vv', this.userId);

    });
    // this.itemsSub = this.itemSrv.getPostUpdateListener().subscribe(
    //   (postsData: any) => {
    //     //  this.isLoading = false;
    //     this.totalPosts = postsData.maxPostCout;
    //     this.items = postsData.items;


    //     this.itemFilter = this.items;
    //     this.items = this.itemFilter.filter((item) => item.itemCart == true);
    //     this.subTotal = 0
    //     this.items.map((item) => {
    //       this.subTotal += item.itemTotal;
    //       //console.log('vv', item, this.subTotal);

    //     })
    //     ///console.log(this.items);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // )
  }
  removeItem(item) {
    //this.subTotal = 0
    this.itemSrv.deleteCartItem(item._id).subscribe((res) => {
      console.log(res);
      this.itemSrv.removetoCart(item.itemCartItem).subscribe((resCart: any) => {
        console.log(resCart);
        this.getCartItem();
      })
    })
  }
  increment_quantity(item: any) {
    let total = item.itemtotal += item.itemPrice;
    let number = item.itemNumber += 1;
    console.log(total, number);

    if (item.itemNumber != 8) {
      this.itemSrv.updateToCart(item._id, item.itemName, item.itemImg, item.itemPrice, item.itemDesc, number, item.itemCate, item.itemQuantity, total).subscribe((resUpdate) => {
        if (resUpdate) {
          this.getCartItem();
        }
      }, err => {
        console.log(err);

      })
    }
    else {
      alert("You are exceed your limit")
    }
  }
  decrement_quantity(item: any) {
    let total = item.itemtotal -= item.itemPrice;
    let number = item.itemNumber -= 1;
    console.log(total, number);

    if (item.itemNumber != 0) {
      this.itemSrv.updateToCart(item._id, item.itemName, item.itemImg, item.itemPrice, item.itemDesc, number, item.itemCate, item.itemQuantity, total).subscribe((resUpdate) => {
        if (resUpdate) {
          this.getCartItem();
        }
      }, err => {
        console.log(err);

      })
    }
    else {
      //alert("You are exceed your limit")
      this.removeItem(item);
    }
  }


}
