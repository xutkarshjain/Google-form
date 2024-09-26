import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-action-header',
  templateUrl: './action-header.component.html',
  styleUrls: ['./action-header.component.css'],
})
export class ActionHeaderComponent implements OnInit {
  selectedTab: string = 'Questions';
  tabList: string[] = ['Questions', 'Responses', 'Settings'];

  @Input() parentForm!: FormGroup;
  @Output() submitFormEvent = new EventEmitter();
  @Output() tabChangeEvent = new EventEmitter();
  ngOnInit(): void {}

  tabChange(event: any) {
    console.log('event', event);
    this.selectedTab = this.tabList[event.index || 0];
    this.tabChangeEvent.emit(this.selectedTab);
  }

  submitForm() {
    this.submitFormEvent.emit();
  }
}
