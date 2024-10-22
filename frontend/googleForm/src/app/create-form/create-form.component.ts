import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsListService } from '../services/forms-service';
import { SaveFormResponse, type Form } from '../models/form';
import { TemplateService } from '../services/template.service';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { QuestionType } from '../constants/question-types.enum';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  formId: string | null = null;
  templateId: string | null = null;
  mode: 'create' | 'edit' | 'template' | null = null;
  formData: any = {};
  loader: boolean = true;
  selectedItem: any = {
    questionIndex: null,
    sectionIndex: null,
    type: '',
  };

  selectedTab: string = 'Questions';
  defaultData: any = {
    formName: 'Untitled form',
    formId: null,
    sections: [
      {
        id: null,
        name: 'Untitled Section',
        description: '',
        shuffle: false,
        questions: [
          {
            id: null,
            label: 'Question',
            type: QuestionType.single_select,
            shuffle: false,
            required: false,
            options: [{ id: null, label: 'Option' }],
          },
        ],
      },
    ],
  };

  parentForm!: FormGroup;
  questionTypes: any = [
    {
      value: QuestionType.single_select,
      viewValue: 'Multiple choice',
    },
    { value: QuestionType.multi_select, viewValue: 'Checkboxes' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private FormService: FormsListService,
    private templateService: TemplateService,
    private router: Router,
    private dialogService: DialogService,
    private userService: UserService
  ) {}

  get sections(): FormArray {
    return this.parentForm.get('sections') as FormArray;
  }

  getQuestions(sectionId: number): FormArray {
    return this.sections.at(sectionId).get('questions') as FormArray;
  }

  getOptions(sectionIndex: number, questionIndex: number): FormArray {
    return this.getQuestions(sectionIndex)
      .at(questionIndex)
      .get('options') as FormArray;
  }

  addSection(data?: object) {
    let formValues = data || this.defaultData.sections[0];
    const section = this.fb.group({
      id: formValues.id || null,
      name: [formValues.name, [Validators.required, Validators.maxLength(250)]],
      description: [formValues.description, [Validators.maxLength(250)]],
      shuffle: formValues.shuffle,
      questions: this.fb.array([]),
    });
    if (!formValues.id && this.sections.length == 0) {
      section.controls.name.patchValue(this.parentForm.value.formName);
    }
    this.sections.push(section);
    for (let question of formValues.questions) {
      this.addQuestion(this.sections.length - 1, question);
    }
  }

  addQuestion(sectionIndex: number, data?: object) {
    let formValues = data || this.defaultData.sections[0].questions[0];
    const question = this.fb.group({
      id: formValues.id,
      label: [
        formValues.label,
        [Validators.required, Validators.maxLength(250)],
      ],
      type: [formValues.type, [Validators.required]],
      shuffle: formValues.shuffle,
      required: formValues.required,
      options: this.fb.array([]),
    });

    this.getQuestions(sectionIndex).push(question);
    let questionIndex: number = this.getQuestions(sectionIndex).length - 1;
    for (let option of formValues.options) {
      this.addOption(sectionIndex, questionIndex, option);
    }
    this.updateSelected(sectionIndex, questionIndex, 'question');
  }

  addOption(sectionIndex: number, questionIndex: number, data?: object) {
    let formValues =
      data || this.defaultData.sections[0].questions[0].options[0];
    const option = this.fb.group({
      id: formValues.id,
      label: [
        formValues.label,
        [Validators.required, Validators.maxLength(250)],
      ],
    });
    this.getOptions(sectionIndex, questionIndex).push(option);
  }

  addOptionWrapper(sectionIndex: number, questionIndex: number) {
    this.addOption(sectionIndex, questionIndex);
    this.parentForm.markAsDirty();
  }

  removeSection(sectionIndex: number) {
    this.sections.removeAt(sectionIndex);
    this.parentForm.markAsDirty();
  }

  removeQuestion(sectionIndex: number, questionIndex: number) {
    this.getQuestions(sectionIndex).removeAt(questionIndex);
    this.parentForm.markAsDirty();
  }

  removeOption(
    sectionIndex: number,
    questionIndex: number,
    optionIndex: number
  ) {
    this.getOptions(sectionIndex, questionIndex).removeAt(optionIndex);
    this.parentForm.markAsDirty();
  }

  ngOnInit(): void {
    const path = this.route.snapshot.routeConfig?.path;
    this.formId = this.route.snapshot.paramMap.get('id');
    this.templateId = this.route.snapshot.queryParamMap.get('templateId');

    if (path?.startsWith('forms/create')) {
      this.mode = this.templateId != null ? 'template' : 'create';
    } else if (path?.startsWith('forms/edit')) {
      this.mode = 'edit';
    }

    this.loadFormData();
    this.parentForm = this.fb.group({
      formName: [this.defaultData.formName, Validators.required],
      formId: this.defaultData.formId,
      sections: this.fb.array([]),
    });
  }

  initializeForm() {
    this.parentForm = this.fb.group({
      formName: [
        this.formData.formName,
        [Validators.required, Validators.maxLength(250)],
      ],
      formId: this.formId,
      sections: this.fb.array([]),
    });
    for (let section of this.formData.sections) {
      this.addSection(section);
    }
    this.scrollToElement(0);
  }

  loadFormData() {
    if (this.mode === 'edit' && this.formId) {
      // Load data for editing the form with formId
      this.FormService.getFormByFormId(this.formId).subscribe(
        (formResponse: Form) => {
          this.formData = formResponse;
          this.initializeForm();
          this.updateSelected(0, 0, 'question');
          this.loader = false;
        },
        (error) => {
          console.error('Error occurred while fetching form:', error);
          this.loader = false;
          this.router.navigate(['/']);
          // redirect to 404 page
        }
      );
    } else if (this.mode === 'template' && this.templateId) {
      // Load data for creating form using template
      this.templateService.getTemplateById(this.templateId).subscribe(
        (templateResponse: any) => {
          this.formData = templateResponse.details;
          this.initializeForm();
          this.updateSelected(0, 0, 'question');

          this.loader = false;
        },
        (error) => {
          // Handle error
          console.error('No Such Template:', error);
          this.mode = 'create';
          this.templateId = null;
          this.loadFormData();
          // redirect to 404 page
        }
      );
    } else {
      this.templateService.getDefaultFormData().subscribe((data: Form) => {
        this.formData = data;
        this.initializeForm();
        this.loader = false;
      });
    }
  }

  updateSelected(sectionIndex: number, questionIndex: number, type: string) {
    this.selectedItem.sectionIndex = sectionIndex;
    this.selectedItem.questionIndex = questionIndex;
    this.selectedItem.type = type;
  }

  getIconForQuestionType(type: string, filled: boolean) {
    if (filled) {
      if (type == QuestionType.single_select) return 'radio_button_checked';
      else if (type == QuestionType.multi_select) return 'check_box';
      else return '';
    } else {
      if (type == QuestionType.single_select) return 'radio_button_unchecked';
      else if (type == QuestionType.multi_select)
        return 'check_box_outline_blank';
      else return '';
    }
  }

  submit(req: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.FormService.saveForm(req).subscribe(
        (saveResponse: SaveFormResponse) => {
          // re-render the form
          resolve(saveResponse);
          this.loader = false;
        },
        (error: any) => {
          reject(null);
          this.loader = false;
        }
      );
    });
  }

  isFormValid(): boolean {
    // validate the form
    if (this.parentForm.valid) {
      return true;
    }
    console.log('validation', false);
    // show toast
    return false;
  }

  submitAndShowURL() {
    if (!this.isFormValid()) {
      // show validation error
      return;
    }
    this.loader = true;
    let req: any = JSON.parse(JSON.stringify(this.parentForm.value));
    this.userService.getLoggedInUser().subscribe((res: User) => {
      let audit: any = {};
      audit['modifiedBy'] = res.id;
      audit['createdBy'] = res.id;
      req['audit'] = audit;

      this.submit(req)
        .then((res: any) => {
          this.showPreviewURL(res.formId);
          this.loadFormData();
          if (!req.formId) {
            this.router.navigate(['/forms/edit/', res.formId]);
          }
        })
        .catch((error: any) => {
          this.showToast();
        });
    });
  }

  saveAndOpenPreview() {
    if (!this.isFormValid()) {
      // show validation error
      return;
    }
    this.loader = true;

    let req: any = JSON.parse(JSON.stringify(this.parentForm.value));
    this.userService.getLoggedInUser().subscribe((res: User) => {
      let audit: any = {};
      audit['modifiedBy'] = res.id;
      audit['createdBy'] = res.id;
      req['audit'] = audit;

      this.submit(req)
        .then((formResponse: SaveFormResponse) => {
          this.openPreviewInNewTab(formResponse.formId);
          this.loadFormData();
          if (!req.formId) {
            this.router.navigate(['/forms/edit/', formResponse.formId]);
          }
        })
        .catch((error: any) => {
          this.showToast();
        }); // .then open preview in new tab
    });
  }

  openPreviewInNewTab(formId: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/forms', formId, 'viewform'])
    );
    window.open(url, '_blank');
  }

  showPreviewURL(url: string) {
    // show previewURL
    let baseUrl = window.location.origin;
    console.log('baseUrl', baseUrl);
    const confirmed = this.dialogService.alert(
      `${baseUrl}/forms/${url}/viewform`
    );
  }

  showToast() {
    // show toast
    console.log('show toast');
  }

  toggleShuffle(sectionIndex: number, questionIndex: number) {
    let updatedValue: boolean =
      !this.getQuestions(sectionIndex).at(questionIndex).value.shuffle;
    this.getQuestions(sectionIndex)
      .at(questionIndex)
      .get('shuffle')
      ?.setValue(updatedValue);
  }

  isSelected(sectionIndex: number, questionIndex: number, type: string) {
    return (
      sectionIndex == this.selectedItem.sectionIndex &&
      questionIndex == this.selectedItem.questionIndex &&
      type == this.selectedItem.type
    );
  }

  addQuestionWrapper(event: any, data?: object) {
    event.stopPropagation();
    this.addQuestion(this.selectedItem.sectionIndex, data);
    this.scrollToElement(
      this.selectedItem.sectionIndex,
      this.getQuestions(this.selectedItem.sectionIndex).length - 1
    );
    this.parentForm.markAsDirty();
  }

  addSectionWrapper(event: any, data?: object) {
    event.stopPropagation();
    this.addSection(data);
    this.scrollToElement(this.sections.length - 1);
    this.parentForm.markAsDirty();
  }

  removeSectionWrapper(event: any) {
    let sectionIndex = this.selectedItem.sectionIndex;
    event.stopPropagation();
    this.removeSection(sectionIndex);
  }

  toggleShuffleWrapper() {
    let sectionIndex = this.selectedItem.sectionIndex;
    let questionIndex = this.selectedItem.questionIndex;
    this.toggleShuffle(sectionIndex, questionIndex);
  }

  duplicateQuestion(event: any, sectionIndex: number, questionIndex: number) {
    let data = JSON.parse(
      JSON.stringify(this.getQuestions(sectionIndex).at(questionIndex).value)
    );
    data.id = null;

    this.addQuestionWrapper(event, data);
    this.parentForm.markAsDirty();
  }

  duplicateSection(event: any) {
    let sectionIndex = this.selectedItem.sectionIndex;
    let data = JSON.parse(JSON.stringify(this.sections.at(sectionIndex).value));
    data.id = null;
    this.addSection(data);
    this.parentForm.markAsDirty();
  }

  isShuffleOn(sectionIndex: number, questionIndex: number) {
    return this.getQuestions(sectionIndex).at(questionIndex).value.shuffle;
  }

  tabChange(tab: string) {
    console.log('tab', tab);
    this.selectedTab = tab;
  }

  scrollToElement(sectionIndex?: number, questionIndex?: number) {
    let target = '';
    if (questionIndex) {
      target = `section_${sectionIndex}_question_${questionIndex}`;
    } else if (sectionIndex != null && sectionIndex != undefined) {
      target = `section_${sectionIndex}`;
    }
    setTimeout(() => {
      const element = document.getElementById(target);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  onOptionBlur(
    sectionIndex: number,
    questionIndex: number,
    optionIndex: number
  ) {
    let option: AbstractControl = this.getOptions(
      sectionIndex,
      questionIndex
    ).at(optionIndex);

    if (!option.value.label || option.value.label.trim() == '') {
      option.patchValue({ id: option.value.id, label: 'Option' });
    }
  }

  onQuestionBlur(sectionIndex: number, questionIndex: number) {
    setTimeout(() => {
      let question = this.getQuestions(sectionIndex).at(questionIndex);
      if (
        question.value.label == null ||
        question.value.label == undefined ||
        question.value.label.trim() == ''
      ) {
        question.patchValue({
          label: 'Untitled Question',
        });
      }
    }, 0);
  }

  onSectionNameBlur(sectionIndex: number) {
    setTimeout(() => {
      let section = this.sections.at(sectionIndex);
      if (
        section.value.name == null ||
        section.value.name == undefined ||
        section.value.name.trim() == ''
      )
        section.patchValue({
          name:
            sectionIndex == 0
              ? this.parentForm.value.formName
              : 'Untitled section',
        });
    }, 0);
  }

  getDisplayNameUsingValue(value: string) {
    let option = this.questionTypes.find((item: any) => {
      return item.value == value;
    });
    return option.viewValue || '';
  }
}
