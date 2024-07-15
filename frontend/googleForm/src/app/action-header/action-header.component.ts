import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-header',
  templateUrl: './action-header.component.html',
  styleUrls: ['./action-header.component.css'],
})
export class ActionHeaderComponent implements OnInit {
  selectedTab: string = 'questions';
  formName: string = 'Untitled Form';
  tabList: string[] = ['Questions', 'Responses', 'Settings'];
  ngOnInit(): void {
    console.log('oninit');
  }

  tabChange(event: any) {
    console.log('event', event);
    this.selectedTab = this.tabList[event.index || 0];
  }
}
