import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import { AddressService } from '../../services/address/address.service';
import { UserData, Address, User } from '../../models/user';
import { CountryData } from '../../models/country';
import { CityData } from '../../models/city';
import { DistrictData } from '../../models/district';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userdata: UserData = new UserData();

  newUser: string;
  newPass: string;

  p = 1;
  totalItems: number;
  totalPages : number;
  
  countryData_Home: CountryData = new CountryData();
  cityData_Home: CityData = new CityData();
  districtData_Home: DistrictData = new DistrictData();
  newStreet_Home: string;
  idCountry_Home = 0;
  idCity_Home = 0;
  idDistrict_Home = 0;

  countryData_Work: CountryData = new CountryData();
  cityData_Work: CityData = new CityData();
  districtData_Work: DistrictData = new DistrictData();
  newStreet_Work: string;
  idCountry_Work = 0;
  idCity_Work= 0;
  idDistrict_Work = 0;
  // formUsers: FormGroup;

  constructor(private router: Router, private userService: UserService, private addressService: AddressService, private fb: FormBuilder) { 
    // this.formUsers = new FormGroup({
    //   Country: new FormControl()
    // });
  }

  ngOnInit() {
    this.getUsers();
  }

  pageChanged(page) {
    this.p = page;
    this.getUsers();
  }

  edit(id: number){
    this.router.navigate(['/detail/'+id]);
  }

  getUsers(): void {
    this.userService.getUsers(4,this.p).subscribe((data) => {
      if(Object.keys(data).length > 0){
        this.userdata = data;
        this.totalItems = data.pagination.totalItems;
        this.totalPages = Math.ceil(this.totalItems/4);
      }
      else
      {
        this.router.navigate(['login']);
      }
    });
  }

  deleteUser(id: number) {
    return this.userService.deleteUser(id).subscribe(data =>
      this.getUsers());
  }

  createUser(){
    let user: User = new User( this.newUser,this.newPass );
    let address: Address = new Address(1,+this.idCountry_Home,+this.idCity_Home,+this.idDistrict_Home,this.newStreet_Home);
    let address2: Address = new Address(2,+this.idCountry_Work,+this.idCity_Work,+this.idDistrict_Work,this.newStreet_Work);
    
    let addresses = [address,address2];
    return this.addressService.createUserAddress( user, addresses ).subscribe(data => {
        this.newUser="";
        this.newPass="";
        this.p = this.totalPages;
        alert(this.userdata.error.message);
        this.getUsers();
    });
  }

  //Home address
  getCountries_Home(){
    return this.addressService.getCountries().subscribe(data => {
      this.countryData_Home=data;
    });
  }

  getCitiesFromId_Home(){
    return this.addressService.getCitiesFromId(this.idCountry_Home).subscribe(data => {
      this.cityData_Home=data;
      this.idCity_Home=0;
      this.idDistrict_Home=0;
      this.getDistrictsFromId_Home();
    });
  }

  getDistrictsFromId_Home(){
    return this.addressService.getDistrictsFromId(this.idCity_Home).subscribe(data => {
      this.districtData_Home=data;
    });
  }

  //Work address
  getCountries_Work(){
    return this.addressService.getCountries().subscribe(data => {
      this.countryData_Work=data;
    });
  }

  getCitiesFromId_Work(){
    return this.addressService.getCitiesFromId(this.idCountry_Work).subscribe(data => {
      this.cityData_Work=data;
      this.idCity_Work=0;
      this.idDistrict_Work=0;
      this.getDistrictsFromId_Work();
    });
  }

  getDistrictsFromId_Work(){
    return this.addressService.getDistrictsFromId(this.idCity_Work).subscribe(data => {
      this.districtData_Work=data;
    });
  }
}
