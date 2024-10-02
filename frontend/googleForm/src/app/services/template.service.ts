import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { FORM_TEMPLATES } from '../constants/form-templates';
import { Template } from '../models/template';
import { defaultData } from '../constants/default-form';
import { Form } from '../models/form';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor() {}

  getAllTemplateSummaries(): Observable<Template[]> {
    const summaries: Template[] = [];

    Object.keys(FORM_TEMPLATES).forEach((templateKey: string) => {
      const { image, label, templateId } = FORM_TEMPLATES[templateKey];

      const summary: Template = {
        image,
        label,
        templateId,
      };

      summaries.push(summary);
    });

    return of(summaries);
  }

  // Method to get a specific template by ID
  getTemplateById(templateId: string): Observable<Template | undefined | null> {
    if (![1, 2, 3, 4, 5].includes(Number(templateId))) {
      return throwError(
        () => new Error('Request failed: Invalid URL or malformed request.')
      );
    }
    const template: Template = FORM_TEMPLATES[`template${templateId}`];
    return of(template).pipe(delay(1000)); // Return the full template structure
  }

  getDefaultFormData(): Observable<Form> {
    return of(defaultData).pipe(delay(500));
  }
}
