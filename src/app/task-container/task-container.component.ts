import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {CommonService} from '../common.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {
tasks;
  constructor(
    private http: HttpClient, private dataService: CommonService) { }

  ngOnInit(): void {
    this.dataService.getTasks().subscribe(res => this.tasks = res);
  }

  // getTasks(): Observable<Tasks[]> {
  //   return this.http.get<Tasks[]>(this.url);
  // }
}
