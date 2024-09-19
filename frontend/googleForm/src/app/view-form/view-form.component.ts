import { Component, OnInit } from '@angular/core';
import { form, section, question, option } from '../models/view-form.model';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { DataRowOutlet } from '@angular/cdk/table';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css'],
})
export class ViewFormComponent implements OnInit {
  currentSectionindex: number = 0;
  viewForm!: FormGroup;
  responseData: form = {
    id: 0,
    sections: [
      {
        id: 1,
        name: 'section-1',
        description: 'desc-1',
        questions: [
          {
            id: 1,
            text: 'question-1',
            type: 'mcq',
            required: true,
            options: [
              {
                id: 1,
                text: 'option-1',
              },
              {
                id: 2,
                text: 'option-2',
              },
              {
                id: 3,
                text: 'option-3',
              },
            ],
          },
          {
            id: 1,
            text: 'question-2',
            type: 'Checkboxes',
            required: false,
            options: [
              {
                id: 1,
                text: 'option-1',
              },
              {
                id: 2,
                text: 'option-2',
              },
              {
                id: 3,
                text: 'option-3',
              },
            ],
          },
        ],
      },
      {
        id: 1,
        name: 'section-2',
        description: '',
        questions: [
          {
            id: 1,
            text: 'question-1',
            type: 'Checkboxes',
            required: true,
            options: [
              {
                id: 1,
                text: 'option-1',
              },
              {
                id: 2,
                text: 'option-2',
              },
              {
                id: 3,
                text: 'option-3',
              },
            ],
          },
        ],
      },
      {
        id: 1,
        name: 'section-3',
        description: 'desc-3',
        questions: [
          {
            id: 1,
            text: 'question-1',
            type: 'Checkboxes',
            required: true,
            options: [
              {
                id: 1,
                text: 'option-1',
              },
              {
                id: 2,
                text: 'option-2',
              },
              {
                id: 3,
                text: 'option-3',
              },
            ],
          },
        ],
      },
    ],
  };
  favoriteSeason: string = '';

  myOptions = ['op1', 'op2'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //fetch responseData from api

    this.viewForm = this.fb.group({
      id: '',
      sections: this.fb.array([]),
    });

    for (let sectionData of this.responseData.sections) {
      this.addSection(sectionData);
    }
  }

  get sections(): FormArray {
    return this.viewForm?.get('sections') as FormArray;
  }

  getQuestion(sectionIndex: number) {
    return this.sections.at(sectionIndex).get('questions') as FormArray;
  }

  getOptions(sectionIndex: number, questionIndex: number) {
    let question = this.getQuestion(sectionIndex).at(questionIndex);
    return question.get('options') as FormArray;
  }

  addSection(data: section) {
    let section = this.fb.group({
      id: data.id, //remove
      name: data.name, //remove
      description: data.description, //remove
      questions: this.fb.array([]),
    });

    this.sections.push(section);
    let sectionIndex = this.sections.value.length - 1;
    for (let questionData of data.questions) {
      this.addQuestion(sectionIndex, questionData);
    }
  }

  addQuestion(sectionIndex: number, data: question) {
    let question = this.fb.group({
      id: data.id,
      text: data.text, //remove
      type: data.type, //remove
      required: data.required, //remove
      options: this.fb.array([]),
      setectedOption: '',
    });

    let questions = this.getQuestion(sectionIndex);
    questions.push(question);

    let questionIndex = questions.length - 1;
    if (data.type == 'mcq') {
      let currentOptionsArray = questions
        .at(questionIndex)
        .get('options') as FormArray;
      currentOptionsArray.push(this.fb.control(''));
    }
  }

  addOptions(sectionIndex: number, questionIndex: number, data: option) {
    let option = this.fb.group({
      id: data.id,
      text: data.text,
    });
    let questions = this.getQuestion(sectionIndex);
    let question = questions.at(questionIndex);
    let options = question.get('options') as FormArray;
    options.push(option);
  }

  getFirstSection() {
    return this.sections.at(0).value;
  }

  nextSection() {
    this.currentSectionindex += 1;
  }

  backSection() {
    this.currentSectionindex = Math.max(0, this.currentSectionindex - 1);
  }

  submitForm() {
    console.log('form', this.viewForm.value);
  }

  myForm!: FormGroup;
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  // Helper method to get the FormArray
  get selectionsFormArray() {
    return this.myForm.get('selections') as FormArray;
  }

  checkBoxChange(e: any) {
    console.log('e', e.checked);
  }

  // Method to handle change events on the checkboxes
  onCheckboxChange(
    event: any,
    value: number,
    sectionIndex: number,
    questionIndex: number
  ) {
    let selectedOptions = this.getOptions(sectionIndex, questionIndex);
    console.log('selectedOptions', selectedOptions);
    console.log(event.checked);
    if (event.checked) {
      selectedOptions.push(this.fb.control(value));
    } else {
      const index = selectedOptions.controls.findIndex(
        (x) => x.value === value
      );
      selectedOptions.removeAt(index);
    }
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

  print(data: any) {
    console.log('data', data);
  }

  isCheckBoxChecked(sectionIndex: number, questionIndex: number, id: number) {
    const options = this.getOptions(sectionIndex, questionIndex);
    const isPresent = options.controls.findIndex((x) => x.value === id);
    return isPresent >= 0;
  }
}
