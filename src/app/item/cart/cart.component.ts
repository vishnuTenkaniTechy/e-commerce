import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

    this.itemSrv.getAllItems(this.postPerPage, this.currentPage);
    this.itemsSub = this.itemSrv.getPostUpdateListener().subscribe(
      (postsData: any) => {
        //  this.isLoading = false;
        this.totalPosts = postsData.maxPostCout;
        this.items = postsData.items;


        this.itemFilter = this.items;
        this.items = this.itemFilter.filter((item) => item.itemCart == true);
        this.subTotal = 0
        this.items.map((item) => {
          this.subTotal += item.itemTotal;
          //console.log('vv', item, this.subTotal);

        })
        ///console.log(this.items);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  removeItem(item) {
    //this.subTotal = 0
    this.itemSrv.removetoCart(item.id, 1, item.itemPrice, false).subscribe((res) => {
      console.log(res);

      this.getCartItem();
    })
  }

}
