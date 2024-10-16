import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { API_URLS } from '../constants/api-url';
import { FormDetailResponse } from '../models/form-detail';
import { Form, SaveFormResponse } from '../models/form';

@Injectable({
  providedIn: 'root',
})
export class FormsListService {
  constructor(private http: HttpClient) {}

  getFormsByUserId(userId: string): Observable<FormDetailResponse> {
    // return this.http
    //   .get<FormDetailResponse>(`${API_URLS.FETCH_ALL_FORMS}`)
    //   .pipe(delay(1000));
    return this.http.get<FormDetailResponse>(
      `${API_URLS.FETCH_ALL_FORMS}/${userId}`
    );
  }

  getFormByFormId(formId: string): Observable<Form> {
    // return this.http.get<Form>(API_URLS.FETCH_FORM_BY_ID).pipe(delay(1000));
    return this.http.get<Form>(`${API_URLS.FETCH_FORM_BY_ID}/${formId}`);
  }

  saveForm(form: any): Observable<SaveFormResponse> {
    // form payload
    // return this.http
    //   .get<SaveFormResponse>(API_URLS.SAVE_FORM)
    //   .pipe(delay(1000));
    let body = form;
    return this.http.post<SaveFormResponse>(API_URLS.SAVE_FORM, body);
  }
}
