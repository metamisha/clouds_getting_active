import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CommonService} from '../common.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {
  tasks;
  taskSuccessImg;
  constructor(
    private http: HttpClient,
    private dataService: CommonService) { }

  ngOnInit(): void {
    this.dataService.getTasks().subscribe(res => this.tasks = res);
    this.taskSuccessImg = this.dataService.getTaskDoneImage();
  }

  acceptTask(id: any) {
    document.getElementById(id).setAttribute('src', this.taskSuccessImg);
  }

  refuseTask(id: any) {
    document.getElementById(id).parentElement.parentElement.parentElement.parentElement.remove();
  }
}
