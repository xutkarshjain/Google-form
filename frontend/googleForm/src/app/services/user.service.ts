import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { type User } from '../models/user';
import { API_URLS } from '../constants/api-url';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(API_URLS.USER_URL);
  }
}
