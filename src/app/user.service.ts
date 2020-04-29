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
    return this.http.post(`localhost/3000/users/`, {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

}

