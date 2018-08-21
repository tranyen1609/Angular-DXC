import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { User,UserData } from '../../models/user';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
// import { of } from 'rxjs/Observable/of';
// import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userdata: UserData;
  private apiUrl = 'http://localhost:5000/api/users';
  private apiLogin = 'http://localhost:5000/api/token';
  

  
  constructor( private http: HttpClient, private router: Router ) {    }
  

  loginUser(user) {
    //Gửi về server cần có Headers và RequestOptions
    //C1:
    //let header1 = new Headers( { 'Content-Type': 'application/json' } );
    //let options = new RequestOptions({headers: header1});
    //C2:
    let options = {headers: new HttpHeaders( { 'Content-Type': 'application/json' } )};
    //Sử dụng post truyền dữ liệu xuống Server, tham số của post cần: link api, tài khoản login và options
    return this.http.post<UserData>(this.apiLogin, user, options).pipe(
    //Nếu có kết quả sẽ map kết quả thành json, ngược lại sẽ xuất lỗi
          // map ( Response => JSON.stringify(Response) ),
          catchError(error) );
  }

  getUsers(pS: number, pN: number){
    let options = {headers: new HttpHeaders( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUrl) + '/page?size=' + pS + '&current=' + pN ;
    return this.http.get<UserData>(url, options).pipe(
      // tap ( Response => Response ),
      catchError(error) );
  }

  deleteUser (id: number) {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUrl) + '/' + (id);
    return this.http.delete(url, options).pipe(
      map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  updateUser (id: number, username: string, pass: string) {
    let user: User = new User( username, pass);
    const url= (this.apiUrl) + '/' + (id);
    let options = {headers: new HttpHeaders( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    console.log(user);
    return this.http.put(url, user, options).pipe(
      map ( Response => JSON.stringify(Response) ),
      catchError(error) );
  }

  // createUser (username: string, pass: string) {
  //   let user: User = new User( username, pass );
  //   let options = {headers: new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
  //   return this.http.post(this.apiUrl, user, options).pipe(
  //     map ( Response => Response.json() ),
  //     catchError(error) );
  // }
  
}
