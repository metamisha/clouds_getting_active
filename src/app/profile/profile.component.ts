import { Component, OnInit } from '@angular/core';
import {CommonService} from "../common.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  constructor(private dataService: CommonService) { }

  ngOnInit(): void {
    this.dataService.getUser().subscribe(res => this.user = res);
  }

}
