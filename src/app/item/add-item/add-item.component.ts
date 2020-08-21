import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemsService } from '../items.service';
import { mimeType } from '../validators/mime-type.validators';
import { from } from 'rxjs';
import { MatCheckbox } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  itemsForm: FormGroup;
  selected = '';
  itemAval: boolean = false;
  itemArray: any = [];
  constructor(private itemSrv: ItemsService, private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.itemsForm = new FormGroup({
      itemName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      itemPrice: new FormControl(null, { validators: [Validators.required] }),
      itemImage: new FormControl(null, { validators: [Validators.required], asyncValidators: mimeType, }),
      itemDesc: new FormControl(null, { validators: [Validators.required] }),
      itemQuan: new FormControl(null, { validators: [Validators.required] }),
      itemCategory: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
    this.route.paramMap.subscribe(params => {
      //this.id = params.get('id')
      this.itemSrv.getViewItemViewById(params.get('itemId')).subscribe((item => {
        this.itemArray = item;
        //console.log('vv', this.itemArray);
        this.itemsForm.setValue({
          itemName: this.itemArray.itemName,
          itemPrice: this.itemArray.itemPrice,
          itemQuan: this.itemArray.itemQuantity,
          itemImage: this.itemArray.itemImg,
          itemDesc: this.itemArray.itemDesc,
          itemCategory: this.itemArray.itemCate
        })
        this.itemAval = this.itemArray.itemAval

      }))
    });
  }
  pickedImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.itemsForm.patchValue({ itemImage: file });
    this.itemsForm.get('itemImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      //this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  showOptions(ev: MatCheckbox) {
    this.itemAval = ev.checked;
  }
  onItemSave() {
    if (this.itemsForm.invalid) {
      return false;
    }
    if (this.itemArray.length == 0) {
      this.itemSrv.addItem(
        this.itemsForm.value.itemName,
        this.itemsForm.value.itemImage,
        this.itemsForm.value.itemPrice,
        this.itemsForm.value.itemDesc,
        this.itemAval,
        this.itemsForm.value.itemCategory,
        this.itemsForm.value.itemQuan
      );
    }
    else {
      this.itemSrv.updateItem(this.itemsForm.value.itemName,
        this.itemsForm.value.itemImage,
        this.itemsForm.value.itemPrice,
        this.itemsForm.value.itemDesc,
        this.itemAval,
        this.itemsForm.value.itemCategory,
        this.itemsForm.value.itemQuan,
        this.itemArray._id)
    }

    this.itemsForm.reset();
  }
}
