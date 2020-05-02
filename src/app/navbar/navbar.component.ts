import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {CommonService} from "../common.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn: boolean;
  constructor(private authenticationService: AuthenticationService,
              private dataService: CommonService) {
    this.dataService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
  }
}
