import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { StaffService } from '../../service/staff.service';
import { SessionService } from '../../service/session.service';


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


  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  constructor(
    public staffService: StaffService,
    public sessionService: SessionService,
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
        Validators.pattern(/\.(jpg|jpeg|PNG)$/)
      ]),
      fileSource: new FormControl('', [
        Validators.required
      ]),
      productType: this.fb.array([], [Validators.required]),
      registrationTime: new FormControl(new Date().toLocaleString('en-GB', { timeZone: 'UTC' })),
    }, { updateOn: 'blur' })

  }

  get customerName() { return this.customerForm.get('customerName'); }
  get customerAge() { return this.customerForm.get('customerAge'); }
  get serviceOfficerName() { return this.customerForm.get('serviceOfficerName'); }
  get nric() { return this.customerForm.get('nric'); }
  get image() { return this.customerForm.get('image'); }
  get branchCode() { return this.customerForm.get('branchCode'); }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.customerForm.patchValue({
        fileSource: file
      });
    }
  }


  onBoard(): void {
    // console.log(this.customerForm.value.fileSource);
    // console.log(this.customerForm.value.registrationTime);
    console.log(new Date().toLocaleString('en-GB', { timeZone: 'UTC' }));
    console.log(this.customerForm.value.registrationTime.slice(0, 10) + ' ' + this.customerForm.value.registrationTime.slice(12, 20));

    let value = this.customerForm.value;

    const formData = new FormData();
    let d = new Date();
    let d_format = this.appendLeadingZeroes(d.getDate()) + "/" + this.appendLeadingZeroes(d.getMonth() + 1) + "/" + d.getFullYear() + " " + this.appendLeadingZeroes(d.getHours()) + ":" + this.appendLeadingZeroes(d.getMinutes()) + ":" + this.appendLeadingZeroes(d.getSeconds());
    // console.log(d_format);

    formData.append("customerName", this.customerForm.value.customerName);
    formData.append("customerAge", this.customerForm.value.customerAge);
    formData.append("serviceOfficerName", this.customerForm.value.serviceOfficerName);
    formData.append("NRIC", this.customerForm.value.nric);
    formData.append("registrationTime", this.customerForm.value.registrationTime.slice(0, 10) + ' ' + this.customerForm.value.registrationTime.slice(12, 20));
    formData.append("branchCode", this.customerForm.value.branchCode);
    formData.append("image", this.customerForm.get('fileSource').value);
    formData.append("productType", this.customerForm.value.productType);

    //Retrieve value from form
    this.staffService.validateForm(formData, this.sessionService.getAccessToken()).subscribe(
      response => {
        console.log("response " + response);
        if (response != null) {
          this.loginError = false;
          this.router.navigate(["/ui/cusForm"]);
        }
        else {
          this.loginError = true;
        }
      },
      error => {
        this.loginError = true;
        this.errorMessage = error
      });


  }

}
