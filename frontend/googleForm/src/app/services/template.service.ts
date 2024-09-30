import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FORM_TEMPLATES } from '../constants/form-templates';
import { Template } from '../models/template';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor() {}

  getAllTemplateSummaries(): Observable<Template[]> {
    const summaries: Template[] = [];

    Object.keys(FORM_TEMPLATES).forEach((templateKey: string) => {
      const { image, label, formId, templateId } = FORM_TEMPLATES[templateKey];

      const summary: Template = {
        image,
        label,
        formId,
        templateId,
      };

      summaries.push(summary);
    });

    return of(summaries);
  }

  // Method to get a specific template by ID
  getTemplateById(templateId: string): Observable<Template | undefined | null> {
    const template: Template = FORM_TEMPLATES[`template${templateId}`];
    return of(template || {}); // Return the full template structure
  }
}
