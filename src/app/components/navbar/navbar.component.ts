import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../service/session.service';
import { ActivatedRoute, Router } from "@angular/router";
import { StaffService } from '../../service/staff.service';
import { JwtHelperService } from '@auth0/angular-jwt';


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

  constructor(public sessionService: SessionService,
    private router: Router,
    public jwtHelper: JwtHelperService,
    private activatedRoute: ActivatedRoute,
    private staffService: StaffService) { }

  ngOnInit(): void {
    
    this.isLogin = this.sessionService.getIsLogin();
    this.decodedToken = this.jwtHelper.decodeToken(this.sessionService.getAccessToken());

    // console.log("decoded " + JSON.stringify(this.decodedToken));
    console.log(this.sessionService.getAccessToken())
    let token = this.sessionService.getAccessToken();
    //Write codes to extend session
    if (this.decodedToken.exp > Date.now() / 1000) {
      var r = window.confirm("session already timeout. Do you wanna extend?");
      if (r === true) {
        this.staffService.extendSession(token).subscribe(
          response => {
            console.log("response " + response);
            if (response != null) {
              this.sessionService.setIsLogin(true);
              this.sessionService.setAccessToken(response);
              console.log(this.jwtHelper.decodeToken(response));
              this.router.navigate(["/ui/cusForm"]);
            }
            else {
              this.extendSessionError = true;
            }
          },
          error => {
            this.extendSessionError = true;
            this.errorMessage = error
          });
      } else{
        this.logout()
      }
    }

  }

  logout(): void {
    this.sessionService.setIsLogin(false);
    //console.log(this.sessionService.getAccessToken());
    this.sessionService.setAccessToken("");

    this.router.navigate(["/ui/login"]);
  }

}
