import {Component, Input, OnInit} from '@angular/core';
import {Task} from "./task";
import {CommonService} from "../common.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../user/user";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  user: User;
  constructor(private dataService: CommonService,
              private router: Router,
              private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('currentUser')).user;
  }

  ngOnInit(): void {
  }

  acceptTask(id: any) {
    document.getElementById(id).setAttribute('src', '../assets/taskDoneImg.png');
    this.user.doneTasks.push(id);
    this.userService.updateDoneTasks(this.user);
  }

  refuseTask(id: any) {
    document.getElementById(id).parentElement.parentElement.parentElement.parentElement.remove();
  }

}
