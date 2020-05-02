import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CommonService} from '../common.service';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";

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
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')).user;
    if(this.user == null){
      this.redirectToLogin();
    }
    this.dataService.getTasks().subscribe(res => {
      this.tasks = res;
      this.tasks.filter((task) => {
        for(let name of this.user.doneTasks){
          if(task.name == name)
            return false;
        }
        return true;
      });
    });
    this.taskSuccessImg = this.dataService.getTaskDoneImage();
  }

  redirectToLogin() {
    this.router.navigate(['/login'])
  }

}
