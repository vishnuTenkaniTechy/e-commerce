import { Injectable, ɵɵstylePropInterpolateV } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient, private route: Router) { }
  private items: any[] = [];
  private itemsUpdated = new Subject<{ items: any[]; maxPostCout: number }>();
  addItem(
    itemName: string,
    itemImg: File,
    itemPrice: string,
    itemDesc: string,
    itemAval: any,
    itemCate: string,
    itemQun: string
  ) {
    const itemData = new FormData();
    itemData.append('itemName', itemName);
    itemData.append('image', itemImg);
    itemData.append('itemPrice', itemPrice);
    itemData.append('itemDesc', itemDesc);
    itemData.append('itemAval', itemAval);
    itemData.append('itemCate', itemCate);
    itemData.append('itemQuantity', itemQun);
    itemData.append('itemTotal', itemPrice);
    this.http
      .post('http://localhost:3000/api/item', itemData)
      .subscribe((response) => {
        console.log(response);
      });
  }
  getAllItems(postPerPage, currentPage) {
    let queryParam = `?pagesize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; post: any; maxPosts: number }>(
        'http://localhost:3000/api/item' + queryParam
      )
      .pipe(
        map((postData) => {
          console.log(postData);

          return {
            item: postData.post.map((p) => {
              return {
                itemName: p.itemName,
                itemPrice: p.itemPrice,
                id: p._id,
                itemImg: p.itemImg,
                itemDesc: p.itemDesc,
                itemQuantity: p.itemQuantity,
                itemCate: p.itemCate,
                itemAval: p.itemAval,
                itemNumber: p.itemNumber,
                itemTotal: p.itemTotal,
                itemCart: p.itemCart,
                itemUser: p.itemUser
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((postDataTransfermedData) => {
        console.log(postDataTransfermedData);

        this.items = postDataTransfermedData.item;
        this.itemsUpdated.next({
          items: [...this.items],
          maxPostCout: postDataTransfermedData.maxPosts,
        });
        //console.log(this.postsUpdated);
      });
  }

  getPostUpdateListener() {
    return this.itemsUpdated.asObservable();
  }
  getViewItemViewById(id: string) {
    let itemId = { id: id }
    return this.http.get<{
      _id: string;

    }>('http://localhost:3000/api/item/' + id)
  }

  storeItemToOrder(item: any) {

    var tempItem = JSON.parse(localStorage.getItem("items"));
    if (tempItem == null) tempItem = [];
    localStorage.setItem("item", JSON.stringify(item));
    tempItem.push(item);
    localStorage.setItem("items", JSON.stringify(tempItem));

  }
  iteml: any;
  getOrderFromItems() {
    return this.iteml = JSON.parse(localStorage.getItem("items"));
  }
  addtoCart(id: string, itemNumber: number, itemTotal: number, itemCart: boolean) {

    //const post:Post={id:id,title: null, content: null,imagePath:null,creator:null,likeValue:null}
    const postId = { id: id, itemNumber: itemNumber, itemTotal: itemTotal, itemCart: itemCart };
    return this.http.put("http://localhost:3000/api/increament/", postId);
  }

  removetoCart(id: string, itemNumber: number, itemTotal: number, itemCart: boolean) {

    //const post:Post={id:id,title: null, content: null,imagePath:null,creator:null,likeValue:null}
    const postId = { id: id, itemNumber: itemNumber, itemTotal: itemTotal, itemCart: itemCart };
    return this.http.put("http://localhost:3000/api/decreament/", postId);
  }

}
