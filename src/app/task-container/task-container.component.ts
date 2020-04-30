import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CommonService} from '../common.service';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {
  tasks;
  taskSuccessImg;
  user;
  constructor(
    private http: HttpClient,
    private dataService: CommonService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user == null){
      this.redirectToLogin();
    }
    this.dataService.getTasks().subscribe(res => this.tasks = res);
    this.taskSuccessImg = this.dataService.getTaskDoneImage();
  }

  acceptTask(id: any) {
    document.getElementById(id).setAttribute('src', this.taskSuccessImg);
  }

  refuseTask(id: any) {
    document.getElementById(id).parentElement.parentElement.parentElement.parentElement.remove();
  }

  redirectToLogin() {
    this.router.navigate(['/login'])
  }
}
