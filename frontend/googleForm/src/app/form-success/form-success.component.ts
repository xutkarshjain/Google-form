import { Component } from '@angular/core';
import { FormSubmissionService } from '../services/form-submission.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-success',
  templateUrl: './form-success.component.html',
  styleUrls: ['./form-success.component.css'],
})
export class FormSuccessComponent {
  formId!: string;
  form = {
    name: '1243423',
    successMessage: 'Your response has been submitted',
  };
  url = '#';

  constructor(
    formSubmissionService: FormSubmissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form.name = formSubmissionService.getFormName();

    this.route.params.subscribe(
      (params) => {
        this.formId = params['id'];
        let baseUrl = window.location.origin;
        this.url = `${baseUrl}/forms/${this.formId}/viewform`;
      },
      (error: any) => {
        // 404 page
      }
    );
    if (!formSubmissionService.isSubmitted()) {
      this.router.navigate(['/forms', this.formId, 'viewform']);
    }
    formSubmissionService.setSubmitted(false);
  }
}
