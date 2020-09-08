import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../item/items.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-viewitem',
  templateUrl: './viewitem.component.html',
  styleUrls: ['./viewitem.component.css']
})
export class ViewitemComponent implements OnInit {

  constructor(private route: ActivatedRoute, private itemSrv: ItemsService,
    private authSrv: AuthService,
    private cdr: ChangeDetectorRef, ) { }
  viewItem: any = [];
  userDetails: any = []
  id: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
      this.loadFunc(this.id)

    });
  }
  ngAfterViewChecked() {
    this.userDetails = this.authSrv.getUserDetails();
    this.cdr.detectChanges();
    // console.log(this.userDetails);
  }
  loadFunc(id) {
    this.itemSrv.viewCartItemById(id).subscribe((item => {
      this.viewItem = item;
      console.log('vv', this.viewItem);

    }))
  }
  addToCart(item) {
    //item.itemCartStatus = true
    console.log(item);
    this.itemSrv.addtoCart(item._id).subscribe((resCart: any) => {
      console.log(resCart);
      this.itemSrv.getViewItemViewById(this.id).subscribe((item => {
        this.viewItem = item;
        ///console.log('vv', item);

      }))
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
    let total = item.itemtotal += item.itemPrice;
    let number = item.itemNumber += 1;
    console.log(total, number);

    if (item.itemNumber != 8) {
      this.itemSrv.updateToCart(item._id, item.itemName, item.itemImg, item.itemPrice, item.itemDesc, number, item.itemCate, item.itemQuantity, total).subscribe((resUpdate) => {
        if (resUpdate) {
          this.loadFunc(this.id);
        }
      }, err => {
        console.log(err);

      })
    }
    else {
      alert("You are exceed your limit")
    }

  }
  decreament(item) {
    let total = item.itemtotal -= item.itemPrice;
    let number = item.itemNumber -= 1;
    console.log(total, number);

    if (item.itemNumber != 0) {
      this.itemSrv.updateToCart(item._id, item.itemName, item.itemImg, item.itemPrice, item.itemDesc, number, item.itemCate, item.itemQuantity, total).subscribe((resUpdate) => {
        if (resUpdate) {
          this.loadFunc(this.id)
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

  removeItem(item) {
    //this.subTotal = 0
    this.itemSrv.deleteCartItem(item._id).subscribe((res) => {
      console.log(res);
      this.itemSrv.removetoCart(item.itemCartItem).subscribe((resCart: any) => {
        console.log(resCart);
        this.loadFunc(this.id)
      })
    })
  }

}
