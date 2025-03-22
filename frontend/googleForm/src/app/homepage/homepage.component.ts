import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsListService } from '../services/forms-service';
import { TemplateService } from '../services/template.service';
import { type FormDetails, FormDetailResponse } from '../models/form-detail';
import { type User } from '../models/user';
import { type Template } from '../models/template';
import { DialogService } from '../services/dialog.service';

export interface formDetails {
  formId: number;
  formName: string;
  createdBy: number;
  modifiedOn: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  breakpoint!: number;
  loading: boolean = true;
  displayedColumns: string[] = [
    'formName',
    'ownedBy',
    'lastModified',
    'action',
  ];

  loggedInUser!: string;
  formsList: FormDetails[] = [];
  templates: Template[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private formsService: FormsListService,
    private templateService: TemplateService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.templateService
      .getAllTemplateSummaries()
      .subscribe((tempResponse: Template[]) => {
        this.templates = tempResponse;
      });
    this.updateBreakPoint();
    this.userService.getLoggedInUser().subscribe((userResponse: User) => {
      this.loggedInUser = userResponse.id;
      this.fetchAllForms();
    });
  }

  fetchAllForms() {
    this.loading = true;
    this.formsService
      .getFormsByUserId(this.loggedInUser)
      .subscribe((fomsListResponse: FormDetailResponse) => {
        this.formsList = this.sortItemsByDate(fomsListResponse.forms);
        this.loading = false;
      });
  }

  sortItemsByDate(arr: FormDetails[]) {
    return arr.sort((a: FormDetails, b: FormDetails) => {
      return (
        new Date(b.modifiedOn).getTime() - new Date(a.modifiedOn).getTime()
      );
    });
  }

  onResize() {
    this.updateBreakPoint();
  }

  openRow(form: formDetails) {
    this.router.navigate(['/forms/edit', form.formId]);
  }

  createFormUsingTemplate(templateId: string) {
    if (templateId && templateId != '0') {
      this.router.navigate(['/forms/create'], {
        queryParams: { templateId: templateId },
      });
    } else {
      this.router.navigate(['/forms/create']);
    }
  }

  updateBreakPoint() {
    if (window.innerWidth >= 1650) {
      this.breakpoint = 6;
    } else if (window.innerWidth >= 1350) {
      this.breakpoint = 5;
    } else if (window.innerWidth >= 1100) {
      this.breakpoint = 4;
    } else if (window.innerWidth >= 800) {
      this.breakpoint = 3;
    } else if (window.innerWidth >= 550) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 1;
    }
  }

  deleteForm(e: Event, row: FormDetails) {
    e.stopPropagation();
    this.formsService
      .deleteFormByFormId(row.formId)
      .subscribe((deleteRes: any) => {
        this.fetchAllForms();
      });
  }

  shareForm() {
    // show previewURL
    let baseUrl = window.location.origin;
    const confirmed = this.dialogService.shareProject(
      baseUrl,
      'Check this out! This detailed Google Forms clone makes creating and customizing forms a breeze. Perfect for your next project!\n\n#GoogleFormsClone #CustomForms'
    );
  }

  rowAction(e: Event) {
    e.stopPropagation();
  }

  openFormInNewTab(form: FormDetails) {
    const urlTree = this.router.createUrlTree(['/forms/edit', form.formId]);
    const fullUrl = this.router.serializeUrl(urlTree);
    window.open(fullUrl, '_blank');
  }
}
