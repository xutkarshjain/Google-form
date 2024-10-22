import { Component, OnInit } from '@angular/core';
import { form, section, question, option } from '../models/view-form.model';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { DataRowOutlet } from '@angular/cdk/table';
import { ViewFormService } from '../services/view-form.service';
import { QuestionType } from '../constants/question-types.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormSubmissionService } from '../services/form-submission.service';

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
  showError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private viewFormService: ViewFormService,
    private route: ActivatedRoute,
    private userService: UserService,
    private formSubmissionService: FormSubmissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // fetch id from url
    this.route.params.subscribe(
      (params) => {
        this.formId = params['id'];

        this.fetchFormData();
      },
      (error: any) => {
        // 404 page
      }
    );
  }

  fetchFormData() {
    this.viewFormService.getRespondentForm(this.formId).subscribe(
      (formResponse: form) => {
        this.responseData = formResponse;
        this.initializeForm();
      },
      (error: any) => {
        console.log('error 404', error);
        this.loader = false;
      }
    );
  }

  initializeForm() {
    this.showError = false;
    this.viewForm = this.fb.group({
      formId: this.formId,
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

  addSection(data: section) {
    let section = this.fb.group({
      id: data.id,
      questions: this.fb.array([]),
    });

    this.sections.push(section);
    let sectionIndex = this.sections.value.length - 1;
    for (let questionData of data.questions || []) {
      this.addQuestion(sectionIndex, questionData);
    }
  }

  addQuestion(sectionIndex: number, data: question) {
    console.log('data.required', data.required);
    let question = this.fb.group({
      id: data.id,
      options: this.fb.array(
        [],
        this.minFormArrayLengthValidator(data.required ? 1 : 0)
      ),
    });

    let questions = this.getQuestions(sectionIndex);
    questions.push(question);
  }

  minFormArrayLengthValidator(minLength: number = 0): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as any as { controls: AbstractControl[] }; // Cast to FormArray
      if (formArray.controls && formArray.controls.length >= minLength) {
        return null; // Valid
      }
      return {
        minFormArrayLength: {
          requiredLength: minLength,
          actualLength: formArray.controls.length,
        },
      }; // Invalid
    };
  }

  getFirstSection() {
    return this.responseData.sections[0];
  }

  nextSection() {
    console.log('form', this.sections.at(this.currentSectionindex).invalid);
    if (this.sections.at(this.currentSectionindex).invalid) {
      this.showError = true;
      console.log('Invalid');
      return;
    }
    this.showError = false;
    this.currentSectionindex += 1;
  }

  backSection() {
    this.currentSectionindex = Math.max(0, this.currentSectionindex - 1);
  }

  submitForm() {
    console.log('form', this.viewForm);
    if (this.viewForm.invalid) {
      this.showError = true;
      console.log('Invalid');
      return;
    }
    this.showError = false;

    let request: any = {};
    request['formId'] = this.formId;
    request['submittedBy'] = this.loggedInUser.id;
    request['submittedOn'] = new Date();
    let sections: any = [];
    for (let section of this.viewForm.value.sections) {
      let sectionObj: any = {};
      sectionObj.id = section.id;
      let questions: any = [];
      for (let question of section.questions || []) {
        let questionObj: any = {};
        questionObj.id = question.id;
        let options: any = [];
        for (let option of question.options || []) {
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
        this.formSubmissionService.setSubmitted(true);
        this.formSubmissionService.setFormName(this.getFormName());
        this.router.navigate(['/forms', this.formId, 'formResponse']);
        // redirect to submit screen
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }

  getFormName() {
    console.log('responseData', this.responseData.sections[0].name);
    if (this.responseData.sections.length) {
      return this.responseData.sections[0].name;
    }
    return '';
  }

  // Method to handle change events on the radio button
  onRadioChange(
    event: any,
    value: number,
    sectionIndex: number,
    questionIndex: number
  ) {
    let selectedOptions = this.getOptions(sectionIndex, questionIndex);
    selectedOptions.removeAt(0);
    selectedOptions.push(this.fb.control(value));
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

  clearForm() {
    this.initializeForm();
  }
}
