import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { User, UserAddress, Address } from '../../models/user';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiCountry = 'http://localhost:5000/api/countries';
  private apiCity = 'http://localhost:5000/api/cities/country/';
  private apiDistrict = 'http://localhost:5000/api/districts/city/';
  private apiUserAddress = 'http://localhost:5000/api/Addresses';
  

  constructor( private http: Http ) { }

  createUserAddress (u: User, a: Array<Address>) {
    let useradd: UserAddress = new UserAddress( u, a );
    let options = {headers: new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    return this.http.post(this.apiUserAddress, useradd, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  getUserAddressFromId(id: number) {
    let options = {headers: new Headers( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUserAddress) + '/user/' + (id);
    return this.http.get(url, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  getAddressFromId(id: number) {
    let options = {headers: new Headers( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUserAddress) + '/' + (id);
    return this.http.get(url, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  updateAddressFromId(id: number, address: Address) {
    let options = {headers: new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUserAddress) + '/' + (id);
    return this.http.put(url, address, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  getCountries() {
    let options = {headers: new Headers( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    return this.http.get(this.apiCountry, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  getCitiesFromId(id: number) {
    let options = {headers: new Headers( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= this.apiCity + id;
    return this.http.get(url, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }

  getDistrictsFromId(id: number) {
    let options = {headers: new Headers( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= this.apiDistrict + id;
    return this.http.get(url, options).pipe(
      map ( Response => Response.json() ),
      catchError(error) );
  }
}
