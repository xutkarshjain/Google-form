import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/api-url';
import { Form } from '../models/form';

@Injectable({
  providedIn: 'root',
})
export class FormsListService {
  constructor(private http: HttpClient) {}

  getFormsByUserId(userId: string): Observable<Form[]> {
    return this.http.get<Form[]>(`${API_URLS.FETCH_ALL_FORMS}`);
    // return this.http.get<Form[]>(`${API_URLS.FETCH_ALL_FORMS}/${userId}`);
  }
}
