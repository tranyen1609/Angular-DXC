import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public formUsers: FormGroup;
  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.formUsers = this.fb.group({
      username : ['',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      password : ['', Validators.required],
      gender : [''],
      phone : ['',[
        Validators.maxLength(12)
      ]],
      email : ['',[
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]],
      birthday : ['']
    });

    // thay đổi giá trị
    // this.formUsers.valueChanges.subscribe(data => console.log(data))
  }

  onSubmit(){
    console.log(this.formUsers.value);
    
  }
}
