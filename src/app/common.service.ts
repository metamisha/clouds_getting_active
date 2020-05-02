import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}
  getTasks(){
    return this.http.get<any>(`http://localhost:3000/tasks`).pipe(map((response: Response) => response));
  }

  getTaskDoneImage() {
    return 'https://bucketclouds.s3.us-east-2.amazonaws.com/imgonline-com-ua-Resize-p0xFRKLibTdg.jpg';
  }
}
