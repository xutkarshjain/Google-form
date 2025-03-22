import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-action-header',
  templateUrl: './action-header.component.html',
  styleUrls: ['./action-header.component.css'],
})
export class ActionHeaderComponent implements OnInit {
  selectedTab: string = 'Questions';
  tabList: string[] = ['Questions', 'Responses', 'Settings'];

  @Input() parentForm!: FormGroup;
  @Output() submitFormAndShowUrlEvent = new EventEmitter();
  @Output() tabChangeEvent = new EventEmitter();
  @Output() saveAndOpenPreviewEvent = new EventEmitter();
  ngOnInit(): void {}

  constructor(private router: Router, private dialogService: DialogService) {}

  tabChange(event: any) {
    this.selectedTab = this.tabList[event.index || 0];
    this.tabChangeEvent.emit(this.selectedTab);
  }

  submitFormAndShowUrl() {
    this.submitFormAndShowUrlEvent.emit();
  }

  onFormNameBlur() {
    setTimeout(() => {
      if (
        this.parentForm.value['formName'].trim() == '' ||
        this.parentForm.value['formName'] == null ||
        this.parentForm.value['formName'] == undefined
      ) {
        this.parentForm.controls['formName'].patchValue('Untitled form');
      }
      this.parentForm.controls['formName'].patchValue(
        this.parentForm.value['formName'].trim()
      );
    }, 1);
  }

  goToHomePage() {
    this.router.navigate(['/forms']);
  }

  onPreview() {
    if (this.parentForm.value.formId && this.parentForm.pristine) {
      this.openPreviewInNewTab(this.parentForm.value.formId);
    } else {
      this.openConfirmDialog();
    }
  }

  openPreviewInNewTab(formId: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/forms', formId, 'viewform'])
    );
    window.open(url, '_blank');
  }

  async openConfirmDialog() {
    const confirmed = await this.dialogService.confirm(
      'Preview',
      'You have some unsaved changes, wanna save first?'
    );
    if (confirmed) {
      this.saveAndOpenPreviewEvent.emit();
    } else {
    }
  }
}
