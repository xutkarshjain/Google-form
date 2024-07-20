import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-action-header',
  templateUrl: './action-header.component.html',
  styleUrls: ['./action-header.component.css'],
})
export class ActionHeaderComponent implements OnInit {
  selectedTab: string = 'questions';
  tabList: string[] = ['Questions', 'Responses', 'Settings'];

  @Input() parentForm!: FormGroup;
  @Output() submitFormEvent = new EventEmitter();
  ngOnInit(): void {}

  tabChange(event: any) {
    console.log('event', event);
    this.selectedTab = this.tabList[event.index || 0];
  }

  submitForm() {
    this.submitFormEvent.emit();
  }
}
