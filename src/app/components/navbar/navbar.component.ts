import { Component, OnInit } from '@angular/core';


import { SessionService } from '../../service/session.service';
import { ActivatedRoute, Router } from "@angular/router";
import { StaffService } from '../../service/staff.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logoutError: boolean;
  errorMessage: string;
  isLogin: boolean;

  constructor(public sessionService: SessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private staffService: StaffService) { }

  ngOnInit(): void {
    this.isLogin =  this.sessionService.getIsLogin();
  }

  logout(): void {
    this.sessionService.setIsLogin(false);
    //console.log(this.sessionService.getAccessToken());
    this.sessionService.setAccessToken("");

    this.router.navigate(["/ui/login"]);
  }


}
