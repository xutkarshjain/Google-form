import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import { type User } from '../models/user';
import { API_URLS } from '../constants/api-url';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDetails!: User;

  constructor(private http: HttpClient) {}

  getLoggedInUser(): Observable<User> {
    if (this.userDetails) {
      return of(this.userDetails);
    }
    return this.http.get<User>(API_URLS.USER_URL).pipe(
      tap((data: User) => {
        this.userDetails = data;
      })
    );
  }
}
