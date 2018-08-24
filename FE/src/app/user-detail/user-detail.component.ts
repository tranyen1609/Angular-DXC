import { Component, OnInit } from '@angular/core';
import { UserAddressesDetail, AddressDetail } from '../../models/address';
import { CountryData } from '../../models/country';
import { CityData } from '../../models/city';
import { AddressData, Address } from '../../models/address';
import { DistrictData } from '../../models/district';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AddressService } from '../../services/address/address.service';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  name: string = localStorage.getItem("user");
  myId: number;
  myUser: string;
  myPass: string;

  addressesDetail: UserAddressesDetail;
  addresses: AddressDetail[];
  addressData: Address;

  countryData: CountryData = new CountryData();
  cityData: CityData = new CityData();
  districtData: DistrictData = new DistrictData();
  idCountry = 0;
  idCity = 0;
  idDistrict = 0;
  street: string;
  addressType: string;
  addressTypeId: number;
  idAddress: number;

  detail_address = true;
  detail_user = true;

  message: string;

  constructor(private location: Location, private addressService: AddressService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUserDetail();
  }

  getUserDetail() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.addressService.getUserAddressFromId(id).subscribe(data => {
      if (Object.keys(data).length > 0) {
        this.addressesDetail = data[0];
        this.myId = id;
        this.myUser = this.addressesDetail.user.name;
        this.myPass = this.addressesDetail.user.password;
        this.addresses = this.addressesDetail.addresses;
      }
    });
  }

  getAddressFromId(id: number, addresstype: string) {
    this.addressType = addresstype;
    return this.addressService.getAddressFromId(id).subscribe(data => {
      this.detail_address = false;
      this.addressData = data['address'][0];
      console.log(this.addressData);
      this.idCountry = this.addressData.countryId;
      this.idCity = this.addressData.cityId;
      this.idDistrict = this.addressData.districtId;
      this.street = this.addressData.street;
      this.idAddress = this.addressData.id;
      this.addressTypeId = this.addressData.addressTypeId;
      this.getCountries();
      this.getCitiesFromId(this.addressData.countryId);
      this.getDistrictsFromId(this.addressData.cityId);
    });
  }

  updateAddressFromId() {
    if (this.idCountry != 0 && this.idCity != 0 && this.idDistrict != 0) {
      let address: Address = new Address(+this.addressTypeId, +this.idCountry, +this.idCity, +this.idDistrict, this.street);
      console.log(address);
      this.addressService.updateAddressFromId(+this.idAddress, address).subscribe(data => {
        this.message = "";
        this.detail_address = true;
      });
    }
    else
    {
      this.message = "The information is invalid!";
    }
  }

  getCountries() {
    return this.addressService.getCountries().subscribe(data => {
      this.countryData = data;
    });
  }

  getCitiesFromId(id: number) {
    return this.addressService.getCitiesFromId(id).subscribe(data => {
      this.cityData = data;
      this.idCity = 0;
      this.idDistrict = 0;
      this.getDistrictsFromId(this.idCity);
    });
  }

  getDistrictsFromId(id: number) {
    return this.addressService.getDistrictsFromId(id).subscribe(data => {
      this.districtData = data;
    });
  }

  updateUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.userService.updateUser(id, this.myUser, this.myPass).subscribe(data =>
      this.router.navigate(['main']));
  }

  editUser() {
    this.detail_user = false;
  }

  cancel() {
    this.detail_address = true;
    this.detail_user = true;
    this.message = "";
    // this.location.back();
  }
}
