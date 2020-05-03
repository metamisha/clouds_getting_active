import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user/user";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  register(user: User) {
    return this.http.post(`http://localhost:3000/users/`, {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  updateDoneTasks(user: User){
    return this.http.put(`http://localhost:3000/users/user`, {
      user: {
        username: user.username,
        email: user.email,
        doneTasks: user.doneTasks,
        token: user.token
      }
    });
  }

}

