import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  @Input('control') control;
  @Input('name-control') controlName;

  constructor() { }

  ngOnInit() {
  }

  get message(){
    // console.log(this.control)
    for(let er in this.control.errors){
      if(this.control.dirty){
        return this.getErrorMessage(er, this.control.errors[er]);
      }
    }
    // return null
  }
  
  getErrorMessage(er, value){
    let message = {
      'required' : `Vui lòng nhập ${this.controlName}`,
      'minlength' : `${this.controlName} tối thiểu ${value.requiredLength} kí tự`,
      'maxlength' : `${this.controlName} tối đa ${value.requiredLength} kí tự`,
      'pattern' : `${this.controlName} không đúng định dạng`
    }
    return message[er];
  }

}
