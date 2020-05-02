import { Component, OnInit } from '@angular/core';
import {CommonService} from "../common.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  isUserLoggedIn;
  constructor(private dataService: CommonService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.dataService.isUserLoggedIn.getValue();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

}
