import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient, private route: Router) { }

  addItem(itemName: string, itemImg: File, itemPrice: string, itemDesc: string, itemAval: any, itemCate: string) {
    const itemData = new FormData();
    itemData.append("itemName", itemName);
    itemData.append("image", itemImg);
    itemData.append("itemPrice", itemPrice);
    itemData.append("itemDesc", itemDesc);
    itemData.append("itemAval", itemAval);
    itemData.append("itemCate", itemCate);
    this.http
      .post('http://localhost:3000/api/item', itemData).subscribe((response) => {
        console.log(response);

      })


  }
}
