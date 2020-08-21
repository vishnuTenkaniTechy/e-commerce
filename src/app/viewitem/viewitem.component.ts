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
      this.itemSrv.getViewItemViewById(params.get('id')).subscribe((item => {
        this.viewItem = item;
        ///console.log('vv', item);

      }))
    });
  }
  ngAfterViewChecked() {
    this.userDetails = this.authSrv.getUserDetails();
    this.cdr.detectChanges();
    // console.log(this.userDetails);
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
    item.itemTotal += item.itemPrice;
    item.itemNumber += 1;
    this.itemSrv.addtoCart(item._id).subscribe((resCart: any) => {
      console.log(resCart);
      this.itemSrv.getViewItemViewById(this.id).subscribe((item => {
        this.viewItem = item;
        ///console.log('vv', item);

      }))
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
        this.itemSrv.removetoCart(item._id).subscribe((resCart: any) => {
          console.log(resCart);
          this.itemSrv.getViewItemViewById(this.id).subscribe((item => {
            this.viewItem = item;
            ///console.log('vv', item);

          }))
        }, err => {
          console.log(err);

        })
      }
      item.itemPrice;


      //this.itemSrv.storeItemToOrder(item);
    } else {
      item.itemNumber > 1 ? item.itemNumber -= 1 : item.itemNumber
      this.itemSrv.removetoCart(item._id).subscribe((resCart: any) => {
        console.log(resCart);
        this.itemSrv.getViewItemViewById(this.id).subscribe((item => {
          this.viewItem = item;
          ///console.log('vv', item);

        }))
      }, err => {
        console.log(err);

      })

    }

  }

}
