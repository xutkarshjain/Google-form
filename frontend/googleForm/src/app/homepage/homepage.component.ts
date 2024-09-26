import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface formDetails {
  formId: number;
  formName: string;
  createdBy: number;
  modifiedOn: string;
}

const ELEMENT_DATA: formDetails[] = [
  {
    formId: 123,
    formName: 'form-1',
    createdBy: 1234,
    modifiedOn: '12/12/2024',
  },
  {
    formId: 124,
    formName: 'form-2',
    createdBy: 1234,
    modifiedOn: '11/10/2024',
  },
  {
    formId: 125,
    formName: 'form-3',
    createdBy: 1234,
    modifiedOn: '09/25/2024',
  },
  {
    formId: 126,
    formName: 'form-4',
    createdBy: 1234,
    modifiedOn: '08/30/2024',
  },
  {
    formId: 127,
    formName: 'form-5',
    createdBy: 1234,
    modifiedOn: '07/15/2024',
  },
  {
    formId: 128,
    formName: 'form-6',
    createdBy: 1234,
    modifiedOn: '06/20/2024',
  },
  {
    formId: 129,
    formName: 'form-7',
    createdBy: 1234,
    modifiedOn: '05/10/2024',
  },
  {
    formId: 130,
    formName: 'form-8',
    createdBy: 1234,
    modifiedOn: '04/05/2024',
  },
  {
    formId: 131,
    formName: 'form-9',
    createdBy: 1234,
    modifiedOn: '03/01/2024',
  },
  {
    formId: 132,
    formName: 'form-10',
    createdBy: 1234,
    modifiedOn: '02/15/2024',
  },
];

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  img = 'assets/formsBlank.png';
  breakpoint: any;
  loading: boolean = true;
  displayedColumns: string[] = [
    'formName',
    'ownedBy',
    'lastModified',
    'action',
  ];

  loggedInUser: string = '1234';
  dataSource: any = [];
  ELEMENT_DATA1: any = ELEMENT_DATA;

  items = [
    { image: 'assets/formsBlank.png', label: 'Blank form', formId: 123 },
    { image: 'assets/RSVP.png', label: 'RSVP', formId: 123 },
    {
      image: 'assets/contact_info.png',
      label: 'Contact Information',
      formId: 123,
    },
    { image: 'assets/party_invite.png', label: 'Party Invite', formId: 123 },
    { image: 'assets/t-shirt.png', label: 'T-Shirt Sign Up', formId: 123 },
    {
      image: 'assets/event-registration.png',
      label: 'Event Registration',
      formId: 123,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateBreakPoint();
    setTimeout(() => {
      this.dataSource = this.ELEMENT_DATA1;
      this.loading = false;
    }, 2000);
  }

  onResize(event: any) {
    this.updateBreakPoint();
  }

  openRow(form: formDetails) {
    console.log('click', form);
    this.router.navigate(['/form', form.formId]);
  }

  createPrefilledForm(formId: any) {
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
