import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {CustomerInterface} from '../../../../interfaces/customer-interface';

@Component({
  selector: 'app-client-private-data-private',
  templateUrl: './client-private-data-private.component.html',
  styleUrls: ['./client-private-data-private.component.scss']
})
export class ClientPrivateDataPrivateComponent implements OnInit {

  // avatarUrl: "img/customers/023648.png"
  // customerNo: "21105209"
  // date: "2022-03-30T19:40:30.082Z"
  // email: "admin@gmail.com"
  // enabled: true
  // firstName: "admin"
  // gender: "male"
  // isAdmin: true
  // lastName: "admin"
  // login: "admin"
  // password: "$2a$10$G.Ii9oIzd5UYWNR5.jHJOe.vdE1/bMFwVf8A2SxSVjuzNk3r36ic6"
  // telephone: "+380630000000"
  // __v: 0
  // _id: "6244b22eef1746001610457d"
  private customer: any;
  formCustomer: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    firstName: new UntypedFormControl(''),
    lastName: new UntypedFormControl(''),
    login: new UntypedFormControl(''),
    telephone: new UntypedFormControl('')
  });

  constructor() { }

  ngOnInit(): void {
    // @ts-ignore
    this.customer = JSON.parse(sessionStorage.getItem('customer'));
    console.log(this.customer)
    this.renderDataCustomer(this.customer);
  }
  renderDataCustomer(data: CustomerInterface): void{
    this.formCustomer.patchValue(data);
  }

}
