import { Injectable } from '@angular/core';
import { form } from '../models/view-form.model';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { API_URLS } from '../constants/api-url';

@Injectable({
  providedIn: 'root',
})
export class ViewFormService {
  constructor(private http: HttpClient) {}

  getRespondentForm(formId: string): Observable<form> {
    return this.http.get<form>(`${API_URLS.FETCH_RESPONDENT_FORM}/${formId}`);

    // return this.http
    //   .get<form>(API_URLS.FETCH_RESPONDENT_FORM)
    //   .pipe(delay(1000));
  }
}
