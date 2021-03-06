import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { User,UserData } from '../../models/user';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';
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
    //Nếu có kết quả sẽ return về két quả có dạng UserData trên, ngược lại sẽ xuất lỗi
          catchError(error) );
  }

  getUsers(pS: number, pN: number): Observable<UserData>{
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUrl) + '/page?size=' + pS + '&current=' + pN ;
    return this.http.get<UserData>(url, options).pipe(
      catchError(error => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.reload();
          }}else {
            return Observable.throw(error);
          }} ));
  }

  deleteUser (id: number) {
    let options = {headers: new HttpHeaders( { 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    const url= (this.apiUrl) + '/' + (id);
    return this.http.delete(url, options).pipe(
      catchError(error) );
  }

  updateUser (id: number, username: string, pass: string) {
    let user: User = new User( username, pass);
    const url= (this.apiUrl) + '/' + (id);
    let options = {headers: new HttpHeaders( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem("token") } )};
    return this.http.put(url, user, options).pipe(
      catchError(error) );
  }
}
