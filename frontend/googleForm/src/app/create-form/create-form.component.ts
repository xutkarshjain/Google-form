import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  selectedItem: any = {
    questionIndex: null,
    sectionIndex: null,
    type: '',
  };

  defaultData: any = {
    formName: 'Untitled Form',
    formId: null,
    sections: [
      {
        id: null,
        name: 'Untitled Section',
        description: '',
        priority: 1,
        shuffle: false,
        questions: [
          {
            id: null,
            text: 'Question',
            type: 'Multiple choice',
            shuffle: false,
            required: false,
            priority: 1,
            options: [
              {
                id: null,
                text: 'option',
                priority: 1,
              },
            ],
          },
        ],
      },
    ],
  };

  responseData: any = {
    formName: 'My form',
    formId: null,
    sections: [
      {
        id: 1,
        name: 'section-1',
        description: 'desc-1',
        priority: 1,
        shuffle: true,
        questions: [
          {
            id: 1,
            text: 'question-1',
            type: 'Checkboxes',
            shuffle: true,
            required: true,
            priority: 1,
            options: [
              {
                id: 1,
                text: 'option-1',
                priority: 1,
              },
              {
                id: 2,
                text: 'option-2',
                priority: 2,
              },
              {
                id: 3,
                text: 'option-3',
                priority: 3,
              },
            ],
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

  constructor(private fb: FormBuilder) {}

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
    let formData = data || this.defaultData.sections[0];
    const section = this.fb.group({
      id: formData.id || null,
      name: [formData.name, Validators.required],
      description: formData.description,
      priority: formData.priority,
      shuffle: formData.shuffle,
      questions: this.fb.array([]),
    });
    this.sections.push(section);
    for (let question of formData.questions) {
      this.addQuestion(this.sections.length - 1, question);
    }
  }

  addQuestion(sectionIndex: number, data?: object) {
    let formData = data || this.defaultData.sections[0].questions[0];
    const question = this.fb.group({
      id: formData.id,
      text: [formData.text, Validators.required],
      type: formData.type,
      shuffle: formData.shuffle,
      required: formData.required,
      priority: formData.priority,
      options: this.fb.array([]),
    });

    this.getQuestions(sectionIndex).push(question);
    let questionIndex: number = this.getQuestions(sectionIndex).length - 1;
    for (let option of formData.options) {
      this.addOption(sectionIndex, questionIndex, option);
    }
    this.updateSelected(sectionIndex, questionIndex, 'question');
  }

  addOption(sectionIndex: number, questionIndex: number, data?: object) {
    let formData = data || this.defaultData.sections[0].questions[0].options[0];
    const option = this.fb.group({
      id: formData.id,
      text: [formData.id, Validators.required],
      priority: formData.priority,
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
    console.log('parentForm', this.parentForm);
    //check whether mode is edit or create
    // if create, initialise with empty data, else call fetch by Id API
    let FormData = this.responseData;

    this.parentForm = this.fb.group({
      formName: [FormData.formName, Validators.required],
      formId: FormData.formId,
      sections: this.fb.array([]),
    });
    for (let section of FormData.sections) {
      this.addSection(section);
    }
  }

  updateSelected(sectionIndex: number, questionIndex: number, type: string) {
    this.selectedItem.sectionIndex = sectionIndex;
    this.selectedItem.questionIndex = questionIndex;
    this.selectedItem.type = type;
    console.log('updateSelected', this.selectedItem);
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
    console.log('save', this.parentForm);
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
}
