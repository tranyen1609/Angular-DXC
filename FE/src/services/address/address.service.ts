import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../models/user';
import { UserAddress, Address } from '../../models/address';
import { error } from '@angular/compiler/src/util';
import { CountryData } from '../../models/country';
import { CityData } from '../../models/city';
import { DistrictData } from '../../models/district';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiCountry = 'http://localhost:5000/api/countries';
  private apiCity = 'http://localhost:5000/api/cities/country/';
  private apiDistrict = 'http://localhost:5000/api/districts/city/';
  private apiUserAddress = 'http://localhost:5000/api/Addresses';
  

  constructor( private http: HttpClient ) { }

  createUserAddress (u: User, a: Array<Address>) {
    let useradd: UserAddress = new UserAddress( u, a );
    let options = {headers: new HttpHeaders( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    return this.http.post(this.apiUserAddress, useradd, options).pipe(
      // map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  getUserAddressFromId(id: number) {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUserAddress) + '/user/' + (id);
    return this.http.get(url, options).pipe(
      // map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  getAddressFromId(id: number) {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUserAddress) + '/' + (id);
    return this.http.get(url, options).pipe(
      // map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  updateAddressFromId(id: number, address) {
    let options = {headers: new HttpHeaders( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUserAddress) + '/' + (id);
    return this.http.put(url, address, options);
  }

  getCountries() {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    return this.http.get<CountryData>(this.apiCountry, options).pipe(
      // map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  getCitiesFromId(id: number) {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= this.apiCity + id;
    return this.http.get<CityData>(url, options).pipe(
      // map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  getDistrictsFromId(id: number) {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= this.apiDistrict + id;
    return this.http.get<DistrictData>(url, options).pipe(
      // map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }
}
