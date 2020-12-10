import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from '../../service/session.service';
import { StaffService } from '../../service/staff.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() authenticated = new EventEmitter<any>()

  loginForm: any = null;
  errorMessage: string = '';
  loginError: boolean;

  constructor(
    public sessionService: SessionService,
    public staffService: StaffService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      password: new FormControl(this.sessionService.getPassword(), [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(64)
      ]),
      email: new FormControl(this.sessionService.getUsername(), [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(64)
      ]),
      rememberMe: new FormControl(this.sessionService.getRememberMe()),
    }, { updateOn: 'blur' })

  }


  //Login
  login(): void {
    console.log("submit form");

    //Retrieve value from form
    this.staffService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      response => {
        // console.log("response " + response);
        if (response != null) {
          if (this.loginForm.value.rememberMe == true) {
            this.sessionService.setUsername(this.loginForm.value.email);
            this.sessionService.setPassword(this.loginForm.value.password);
            this.sessionService.setRememberMe(true);
          } else {
            this.sessionService.setUsername("");
            this.sessionService.setPassword("");
            this.sessionService.setRememberMe(false);
          }
          this.sessionService.setIsLogin(true);
          this.sessionService.setAccessToken(response);
          console.log(this.sessionService.getUsername());
          console.log(this.sessionService.getAccessToken());
          // this.sessionService.setUserId(response.userId);
          //console.log(this.sessionService.getUserId());
          this.loginError = false;

          this.authenticated.emit();

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
