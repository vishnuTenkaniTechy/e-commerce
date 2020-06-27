import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemsService } from '../items.service';
import { mimeType } from "../validators/mime-type.validators"
import { from } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemsForm: FormGroup;
  selected = "";
  constructor(private itemSrv: ItemsService) { }

  ngOnInit(): void {
    this.itemsForm = new FormGroup({
      itemName: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      itemPrice: new FormControl(null, { validators: [Validators.required] }),
      itemImage: new FormControl(null, { validators: [Validators.required], }),
      itemDesc: new FormControl(null, { validators: [Validators.required], }),
      itemCategory: new FormControl(null, { validators: [Validators.required], asyncValidators: mimeType }),
    })
  }
  pickedImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.itemsForm.patchValue({ itemImage: file });
    this.itemsForm.get("itemImage").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      //this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);


  }

  onItemSave() {
    if (this.itemsForm.invalid) {
      return false;
    }
    this.itemSrv.addItem(this.itemsForm.value.itemName, this.itemsForm.value.itemImage, this.itemsForm.value.itemPrice,
      this.itemsForm.value.itemDesc, true, this.itemsForm.value.itemCategory)
    this.itemsForm.reset();


  }
}
