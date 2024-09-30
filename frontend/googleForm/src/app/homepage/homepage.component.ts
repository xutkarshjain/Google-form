import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsListService } from '../services/forms-service';
import { TemplateService } from '../services/template.service';
import { type Form } from '../models/form';
import { type User } from '../models/user';
import { type Template } from '../models/template';

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
  formsList: Form[] = [];
  templates: Template[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private formsService: FormsListService,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {
    this.templateService
      .getAllTemplateSummaries()
      .subscribe((tempResponse: Template[]) => {
        this.templates = tempResponse;
        console.log('this.templates', this.templates);
      });
    this.updateBreakPoint();
    this.userService.getLoggedInUser().subscribe((userResponse: User) => {
      this.loggedInUser = userResponse.id;
      this.formsService
        .getFormsByUserId(this.loggedInUser)
        .subscribe((fomsListResponse: Form[]) => {
          this.formsList = fomsListResponse;
          this.loading = false;
        });
    });
  }

  onResize() {
    this.updateBreakPoint();
  }

  openRow(form: formDetails) {
    console.log('click', form);
    this.router.navigate(['/form', form.formId]);
  }

  createPrefilledForm(formId: string) {
    this.router.navigate(['/form', formId]);
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
}
