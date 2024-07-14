import { Component, OnInit } from '@angular/core';



export interface PeriodicElement {
  formName: string;
  lastModified: string;
  ownedBy: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { formName: 'Untitled name-1', lastModified: '2023-06-15T12:00:00Z', ownedBy: 'me' },
  { formName: 'Untitled name-2', lastModified: '2023-07-01T09:30:00Z', ownedBy: 'me' },
  { formName: 'Untitled name-3', lastModified: '2023-08-20T15:45:00Z', ownedBy: 'me' },
  { formName: 'Untitled name-4', lastModified: '2023-09-05T08:00:00Z', ownedBy: 'me' },
  { formName: 'Untitled name-5', lastModified: '2023-10-10T16:30:00Z', ownedBy: 'me' },
  { formName: 'Untitled name-6', lastModified: '2023-08-20T15:45:00Z', ownedBy: 'me' },
  { formName: 'Untitled name-7', lastModified: '2023-09-05T08:00:00Z', ownedBy: 'me' },
  { formName: 'Untitled name-8', lastModified: '2023-10-10T16:30:00Z', ownedBy: 'me' },  
  { formName: 'Untitled name-9', lastModified: '2023-08-20T15:45:00Z', ownedBy: 'me' },
  { formName: 'Untitled name-10', lastModified: '2023-09-05T08:00:00Z', ownedBy: 'me' },
  { formName: 'Untitled name-11', lastModified: '2023-10-10T16:30:00Z', ownedBy: 'me' },
];

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  img = 'assets/formsBlank.png';
  breakpoint: any;
  displayedColumns: string[] = ['formName', 'ownedBy', 'lastModified', 'action'];
  dataSource = ELEMENT_DATA;

  items = [
    { image: 'assets/formsBlank.png', label: 'Blank form' },
    { image: 'assets/RSVP.png', label: 'RSVP' },
    { image: 'assets/contact_info.png', label: 'Contact Information' },
    { image: 'assets/party_invite.png', label: 'Party Invite' },
    { image: 'assets/t-shirt.png', label: 'T-Shirt Sign Up' },
    { image: 'assets/event-registration.png', label: 'Event Registration' },
  ];

  ngOnInit(): void {
    this.updateBreakPoint();
  }

  onResize(event: any) {
    this.updateBreakPoint();
  }

  openRow(row:PeriodicElement){
    console.log('click', row)
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
