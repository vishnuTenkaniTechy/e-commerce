import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  firstName: String;
  lastName: String;
  email: String;
  Address: String;
  address2: String;
  state: String;
  city: String;
  zip: String;
  type: String;
  ccname: String;
  ccnumber: String;
  ccexpiration: String;
  cccvv: String;
  constructor(private router: Router, private validateService: ValidatorService) { }

  ngOnInit(): void {
  }


  orderPlaced() {


    const checkout = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      Address: this.Address,
      address2: this.address2,
      state: this.state,
      city: this.state,
      zip: this.zip
    }

    const card = {
      type: this.type,
      ccname: this.ccname,
      ccnumber: this.ccnumber,
      ccexpiration: this.ccexpiration,
      cccvv: this.cccvv
    }

    if (!this.validateService.validateCheckout(checkout)) {
      //this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validateCard(card)) {
      //this.flashMessage.show('Please fill all the card details', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }


    //this.flashMessage.show('Your order is Placed', { cssClass: 'alert-success', timeout: 8000 });
    //this.authService.orderClear();
    this.router.navigate(['/']);
  }

}
