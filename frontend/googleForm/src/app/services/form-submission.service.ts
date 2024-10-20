import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormSubmissionService {
  private submitted = false;
  private formName = '';

  constructor() {}

  setSubmitted(value: boolean) {
    this.submitted = value;
  }

  isSubmitted() {
    return this.submitted;
  }

  setFormName(value: string) {
    this.formName = value;
  }

  getFormName() {
    return this.formName;
  }
}
