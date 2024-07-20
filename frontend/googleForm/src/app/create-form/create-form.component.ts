import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  Validator,
  FormArray,
} from '@angular/forms';

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

  sectionsArray: any = [
    {
      sectionName: 'Untitled Section',
      sectionId: 1,
      sectionDescription: '',
      shuffleQuestions: true,
      sectionPriority: 1,
      questions: [
        {
          questionId: 3,
          questionText: 'What is your age?',
          questionType: 'MCQ',
          required: true,
          shuffleOptions: true,
          questionPriority: 1,
          options: [
            {
              optionId: 1,
              optionText: 'Ramesh',
              optionPriority: 1,
            },
            {
              optionId: 2,
              optionText: 'Suresh',
              optionPriority: 2,
            },
            {
              optionId: 1,
              optionText: 'Mahesh',
              optionPriority: 3,
            },
          ],
        },
        {
          questionId: 4,
          questionText: 'What is your name?',
          questionType: 'MCQ',
          required: true,
          shuffleOptions: true,
          questionPriority: 1,
          options: [
            {
              optionId: 1,
              optionText: 'Ramesh',
              optionPriority: 1,
            },
          ],
        },
      ],
    },
  ];

  parentForm: FormGroup;
  questionTypes: any = [
    { value: 'Multiple choice', viewValue: 'Multiple choice' },
    { value: 'Checkboxes', viewValue: 'Checkboxes' },
  ];

  constructor(private fb: FormBuilder) {
    this.parentForm = this.fb.group({
      formName: ['Untitled form', Validators.required],
      formId: '',
      sections: fb.array([]),
    });
    this.addSection();
  }

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

  addSection() {
    const section = this.fb.group({
      id: null,
      name: ['Untitled section', Validators.required],
      description: ['Description'],
      priority: null,
      shuffle: false,
      questions: this.fb.array([]),
    });
    this.sections.push(section);
    this.addQuestion(this.sections.length - 1);
  }

  addQuestion(sectionIndex: number) {
    const question = this.fb.group({
      id: null,
      text: ['Question', Validators.required],
      type: 'Multiple choice',
      shuffle: false,
      required: false,
      priority: null,
      options: this.fb.array([]),
    });

    this.getQuestions(sectionIndex).push(question);
    let questionIndex: number = this.getQuestions(sectionIndex).length - 1;
    this.addOption(sectionIndex, questionIndex);
    this.updateSelected(sectionIndex, questionIndex, 'question');
  }

  addOption(sectionIndex: number, questionIndex: number) {
    const option = this.fb.group({
      id: '',
      text: ['option', Validators.required],
      priority: '',
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
    console.log('save', this.parentForm);
  }

  toggleShiffle(sectionIndex: number, questionIndex: number) {
    let updatedValue: boolean =
      !this.getQuestions(sectionIndex).at(questionIndex).value.shuffle;
    this.getQuestions(sectionIndex)
      .at(questionIndex)
      .get('shuffle')
      ?.setValue(updatedValue);
  }
}
