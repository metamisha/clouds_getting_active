import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {}
  getTasks(){
    return this.http.get<any>('http://localhost:3000/tasks').pipe(map((response: Response) => response));
  }

  getTaskDoneImage() {
    return './assets/taskDoneImg.png';
  }

  getUser(){
    return this.http.get<any>('http://localhost:3000/users/user').pipe(map((response: Response) => response));
  }
}
