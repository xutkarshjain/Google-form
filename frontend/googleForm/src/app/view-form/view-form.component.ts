import { Component, OnInit } from '@angular/core';
import { form, section, question, option } from '../models/view-form.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DataRowOutlet } from '@angular/cdk/table';
import { ViewFormService } from '../services/view-form.service';
import { QuestionType } from '../constants/question-types.enum';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css'],
})
export class ViewFormComponent implements OnInit {
  currentSectionindex: number = 0;
  viewForm!: FormGroup;
  responseData!: form;
  favoriteSeason: string = '';
  loader: boolean = true;
  formId: string = '';
  QuestionType = QuestionType;
  loggedInUser!: User;

  constructor(
    private fb: FormBuilder,
    private viewFormService: ViewFormService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // fetch id from url
    this.route.params.subscribe(
      (params) => {
        this.formId = params['id'];
        this.viewFormService.getRespondentForm(this.formId).subscribe(
          (formResponse: form) => {
            this.responseData = formResponse;
            this.viewForm = this.fb.group({
              formId: this.responseData.formId,
              submittedBy: '',
              submittedOn: '',
              sections: this.fb.array([]),
            });

            for (let sectionData of this.responseData.sections) {
              this.addSection(sectionData);
            }
            this.loader = false;
            this.userService.getLoggedInUser().subscribe((userRes: User) => {
              this.loggedInUser = userRes;
            });
          },
          (error: any) => {
            console.log('error 404', error);
            this.loader = false;
          }
        );
      },
      (error: any) => {
        // 404 page
      }
    );
  }

  get sections(): FormArray {
    return this.viewForm?.get('sections') as FormArray;
  }

  getQuestions(sectionIndex: number) {
    return this.sections.at(sectionIndex).get('questions') as FormArray;
  }

  getOptions(sectionIndex: number, questionIndex: number) {
    let question = this.getQuestions(sectionIndex).at(questionIndex);
    return question.get('options') as FormArray;
  }

  getOption(sectionIndex: number, questionIndex: number, optionIndex: number) {
    let option =
      this.responseData['sections'][sectionIndex]['questions'][questionIndex][
        'options'
      ][optionIndex];
    return option;
  }

  addSection(data: section) {
    let section = this.fb.group({
      id: data.id,
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
      options: this.fb.array([]),
    });

    let questions = this.getQuestions(sectionIndex);
    questions.push(question);

    let questionIndex = questions.length - 1;
    if (data.type == QuestionType.single_select) {
      let currentOptionsArray = questions
        .at(questionIndex)
        .get('options') as FormArray;
      currentOptionsArray.push(this.fb.control(''));
    }
  }

  getFirstSection() {
    return this.responseData.sections[0];
  }

  nextSection() {
    this.currentSectionindex += 1;
  }

  backSection() {
    this.currentSectionindex = Math.max(0, this.currentSectionindex - 1);
  }

  submitForm() {
    console.log('form', this.viewForm.value);
    let request: any = {};
    request['formId'] = this.viewForm.value.formId;
    request['submittedBy'] = this.loggedInUser.id;
    request['submittedOn'] = new Date();
    let sections: any = [];
    for (let section of this.viewForm.value.sections) {
      let sectionObj: any = {};
      sectionObj.id = section.id;
      let questions: any = [];
      for (let question of section.questions) {
        let questionObj: any = {};
        questionObj.id = question.id;
        let options: any = [];
        for (let option of question.options) {
          if (option != '') {
            options.push(option);
          }
        }
        if (options.length) {
          questionObj.options = options;
          questions.push(questionObj);
        }
      }
      if (questions.length) {
        sectionObj.questions = questions;
        sections.push(sectionObj);
      }
    }
    request.sections = sections;
    console.log('request', request);
    this.viewFormService.saveUSerResponse(request).subscribe(
      (saveResponse: any) => {
        console.log('success', saveResponse);
        // redirect to submit screen
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }

  // Method to handle change events on the checkboxes
  onCheckboxChange(
    event: any,
    value: number,
    sectionIndex: number,
    questionIndex: number
  ) {
    let selectedOptions = this.getOptions(sectionIndex, questionIndex);
    if (event.checked) {
      selectedOptions.push(this.fb.control(value));
    } else {
      const index = selectedOptions.controls.findIndex(
        (x) => x.value === value
      );
      selectedOptions.removeAt(index);
    }
  }

  isCheckBoxChecked(sectionIndex: number, questionIndex: number, id: number) {
    const options = this.getOptions(sectionIndex, questionIndex);
    const isPresent = options.controls.findIndex((x) => x.value === id);
    return isPresent >= 0;
  }
}
