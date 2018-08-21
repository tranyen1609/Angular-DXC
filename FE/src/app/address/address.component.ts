import { Component, OnInit, Input } from '@angular/core';
import { AddressService } from '../../services/address/address.service'
import { UserAddress1 } from '../../models/userAddress';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  info: Object;
  pageSize: number = 4;
  currentPage: number = 1;
  totalItems: number;

  constructor(private data: AddressService) { }

  userAddressId: number;

  ngOnInit() {
    this.getUserAddresses();
  }

  getUserAddresses() {
    this.data.getUserAddresses(this.pageSize, this.currentPage).subscribe(
      result => {
        this.info = result;
      },
      err => console.log(err),
      () => console.log(this.info)
    );
  }

  pageChanged(event) {
    this.currentPage = event;
    this.getUserAddresses();
  }

  edit(id: number) {
    this.userAddressId = id;
  }

}
