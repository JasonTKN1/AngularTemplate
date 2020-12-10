import { Component, OnInit, Input } from '@angular/core';

import { SessionService } from '../../service/session.service';
import { ActivatedRoute, Router } from "@angular/router";
import { StaffService } from '../../service/staff.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { interval, Subscription } from 'rxjs';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) { }
}




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  logoutError: boolean;
  extendSessionError: boolean;
  errorMessage: string;
  isLogin: boolean;
  decodedToken: any;

  alert: Subscription;
  expiry: Subscription;
  expired: boolean;

  time: string;
  timer: any;

  constructor(public sessionService: SessionService,
    private router: Router,
    public jwtHelper: JwtHelperService,
    private activatedRoute: ActivatedRoute,
    private staffService: StaffService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLogin = this.sessionService.getIsLogin();
    if (!this.isLogin) {
      this.router.navigate(["/ui/login"]);
    }

    this.timeCheck();
  }

  timeCheck() {
    this.decodedToken = this.jwtHelper.decodeToken(this.sessionService.getAccessToken());
    let expirationTime = this.decodedToken.exp; // in seconds 
    let now = Date.now(); // in milliseconds 
    let alertTime = Math.floor(expirationTime * 1000) - now - 5 * 1000; // in milliseconds (extra 5 seconds before token expires)

    // in milliseconds by default 
    // send the alert 5 seconds before the token expires 
    this.alert = interval(alertTime).subscribe(x => {
      this.extendSession();
    });

    this.timer = setInterval(() => {
      this.time = ' Session Expiring in : ' + Math.floor((expirationTime - Date.now()/ 1000) / 60) + ' Mins ' + Math.floor(expirationTime - Date.now() / 1000) % 60 + ' Seconds';
    }, 1000);

  }

  extendSession() {
    var r = window.confirm("The session has timed out. Do you want to extend the session?");

    // must check if at this moment the token is still valid
    // if the user does not click anything, then the if else loop will not run at all, the alert must be ful
    if (r == true && !this.jwtHelper.isTokenExpired(this.sessionService.getAccessToken())) {
      this.staffService.extendSession(this.sessionService.getAccessToken()).subscribe(
        response => {
          if (response != null) {
            console.log(response);
            this.sessionService.setIsLogin(true);
            this.sessionService.setAccessToken(response);
            this.router.navigate(["/ui/cusForm"]);
            this.timeCheck();
            
          }
          else {
            console.log("Error: Could not get response");
          }
        },
        error => {
          console.log(error);
        });
    } else {
      // includes cases where user clicks cancel || clicks ok but token is expired 
      this.logout();
    }
    this.alert.unsubscribe();
  }

  logout(): void {
    this.sessionService.setIsLogin(false);
    //console.log(this.sessionService.getAccessToken());
    this.sessionService.setAccessToken("");

    this.router.navigate(["/ui/login"]);
  }

}
