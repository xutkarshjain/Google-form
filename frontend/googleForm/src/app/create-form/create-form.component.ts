import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsListService } from '../services/forms-service';
import { type Form } from '../models/form';
import { TemplateService } from '../services/template.service';

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
    formName: 'Untitled-form',
    formId: null,
    sections: [
      {
        id: null,
        name: 'Untitled Section',
        description: '',
        shuffle: true,
        questions: [
          {
            id: 1,
            label: 'Question',
            type: 'Checkboxes',
            shuffle: true,
            required: true,
            options: [{ id: 1, label: 'Option 1' }],
          },
        ],
      },
    ],
  };

  parentForm!: FormGroup;
  questionTypes: any = [
    { value: 'Multiple choice', viewValue: 'Multiple choice' },
    { value: 'Checkboxes', viewValue: 'Checkboxes' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private FormService: FormsListService,
    private templateService: TemplateService
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
      name: [formValues.name, Validators.required],
      description: formValues.description,
      shuffle: formValues.shuffle,
      questions: this.fb.array([]),
    });
    this.sections.push(section);
    for (let question of formValues.questions) {
      this.addQuestion(this.sections.length - 1, question);
    }
  }

  addQuestion(sectionIndex: number, data?: object) {
    let formValues = data || this.defaultData.sections[0].questions[0];
    const question = this.fb.group({
      id: formValues.id,
      label: formValues.label,
      type: formValues.type,
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
      label: [formValues.id, Validators.required],
    });
    this.getOptions(sectionIndex, questionIndex).push(option);
  }

  removeSection(sectionIndex: number) {
    this.sections.removeAt(sectionIndex);
  }

  removeQuestion(sectionIndex: number, questionIndex: number) {
    this.getQuestions(sectionIndex).removeAt(questionIndex);
  }

  removeOption(
    sectionIndex: number,
    questionIndex: number,
    optionIndex: number
  ) {
    this.getOptions(sectionIndex, questionIndex).removeAt(optionIndex);
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
    console.log('mode', this.mode);

    this.loadFormData();
    this.parentForm = this.fb.group({
      formName: [this.defaultData.formName, Validators.required],
      formId: this.defaultData.formId,
      sections: this.fb.array([]),
    });
  }

  initializeForm() {
    this.parentForm = this.fb.group({
      formName: [this.formData.formName, Validators.required],
      formId: this.formData.formId,
      sections: this.fb.array([]),
    });
    for (let section of this.formData.sections) {
      this.addSection(section);
    }
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
      if (type == 'Multiple choice') return 'radio_button_checked';
      else if (type == 'Checkboxes') return 'check_box';
      else return '';
    } else {
      if (type == 'Multiple choice') return 'radio_button_unchecked';
      else if (type == 'Checkboxes') return 'check_box_outline_blank';
      else return '';
    }
  }

  submit() {
    //validate request and call save API
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
  }

  addSectionWrapper(event: any, data?: object) {
    event.stopPropagation();
    this.addSection(data);
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
    this.addQuestionWrapper(
      event,
      JSON.parse(
        JSON.stringify(this.getQuestions(sectionIndex).at(questionIndex).value)
      )
    );
  }

  duplicateSection(event: any) {
    let sectionIndex = this.selectedItem.sectionIndex;
    let data = JSON.parse(JSON.stringify(this.sections.at(sectionIndex).value));
    this.addSection(data);
  }

  isShuffleOn() {
    let sectionIndex = this.selectedItem.sectionIndex;
    let questionIndex = this.selectedItem.questionIndex;
    return this.getQuestions(sectionIndex).at(questionIndex).value.shuffle;
  }

  tabChange(tab: string) {
    console.log('tab', tab);
    this.selectedTab = tab;
  }
}
