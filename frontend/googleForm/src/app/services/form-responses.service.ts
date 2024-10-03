import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { API_URLS } from '../constants/api-url';
import { FormResponse } from '../models/form-response';

@Injectable({
  providedIn: 'root',
})
export class FormResponsesService {
  constructor(private http: HttpClient) {}

  fetchAllResponse(formId: string): Observable<FormResponse> {
    const body: any = {
      formId: formId,
    };
    return this.http
      .get<FormResponse>(API_URLS.FETCH_ALL_RESPONSES)
      .pipe(delay(400));
    // return this.http.post<FormResponse[]>(API_URLS.FETCH_ALL_RESPONSES, body);
  }
}
