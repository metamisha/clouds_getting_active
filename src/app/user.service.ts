import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  register(user: User) {
    console.log('user is being registered');
    return this.http.post(`http://localhost:3000/users/`, {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  updateDoneTasks(user: User){
    console.log('updating task');
    return this.http.put(`http://localhost:3000/users/user/`, {
      doneTasks: user.doneTasks
    });
  }

}

