import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { StaffService } from '../../service/staff.service';


@Component({
  selector: 'app-cus-form',
  templateUrl: './cus-form.component.html',
  styleUrls: ['./cus-form.component.scss']
})
export class CusFormComponent implements OnInit {

  Data: Array<any> = [
    { name: 'Investor', value: 'investor' },
    { name: 'Insurance', value: 'insurance' },
    { name: 'Loans', value: 'loans' },
    { name: 'Savings', value: 'savings' },
    { name: 'Credit Card', value: 'creditcard' }
  ];

  customerForm: any = null;
  errorMessage: string = '';
  loginError: boolean;

  constructor(
    public staffService: StaffService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  onCheckboxChange(e) {
    const productType: FormArray = this.customerForm.get('productType') as FormArray;

    if (e.target.checked) {
      productType.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      productType.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          productType.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      customerName: new FormControl('', [
        Validators.required,
        Validators.maxLength(64)
      ]),
      customerAge: new FormControl('', [
        Validators.required,
        Validators.min(18),
      ]),
      serviceOfficerName: new FormControl('', [
        Validators.required,
        Validators.maxLength(64)
      ]),
      nric: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[STFG]\d{7}[A-Z]$/),
        Validators.maxLength(64)
      ]),
      branchCode: new FormControl('', [
        Validators.required,
      ]),
      image: new FormControl('', [
        Validators.required,
      ]),
      productType: this.fb.array([], [Validators.required])

    }, { updateOn: 'blur' })
  }

  get customerName() { return this.customerForm.get('customerName'); }
  get customerAge() { return this.customerForm.get('customerAge'); }
  get serviceOfficerName() { return this.customerForm.get('serviceOfficerName'); }
  get nric() { return this.customerForm.get('nric'); }


  onBoard(): void {
    console.log("submit form" + JSON.stringify(this.customerForm.value));
    let value = this.customerForm.value;

    //Retrieve value from form


  }

}
