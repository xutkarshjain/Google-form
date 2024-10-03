import {
  AfterViewInit,
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { Form } from '../models/form';
import { MatTabChangeEvent } from '@angular/material/tabs';
import Chart from 'chart.js/auto';
import { FormResponsesService } from '../services/form-responses.service';
import { FormResponse } from '../models/form-response';

@Component({
  selector: 'app-form-responses',
  templateUrl: './form-responses.component.html',
  styleUrls: ['./form-responses.component.css'],
})
export class FormResponsesComponent
  implements OnInit, AfterViewInit, OnChanges
{
  constructor(
    private cdr: ChangeDetectorRef,
    private formResponsesService: FormResponsesService
  ) {}

  @Input() formData!: Form;
  selectedTab: string = 'Summary';
  tabs: string[] = ['Summary', 'Question', 'Individual'];
  primaryColor = 'rgb(103, 58, 183)';
  optionsFrequency: any = {};
  formSummary: any = [];
  loader: boolean = true;
  backgroundColor = [
    '#3366cc',
    '#dc3912',
    '#ff9900',
    '#109618',
    '#990099',
    '#0099c6',
    '#dd4477',
    '#66aa00',
    '#b82e2e',
    '#316395',
    '#994499',
    '#22aa99',
    '#aaaa11',
    '#6633cc',
  ];

  responses: FormResponse = {
    formId: null,
    responses: [],
  };

  initializeOptionsFrequency() {
    let sections: any = [];
    for (let section of this.formData.sections) {
      let sectionObj: any = {};
      let questions: any = [];
      for (let question of section.questions) {
        let questionObj: any = {};
        let options: any = [];
        for (let option of question.options) {
          let optionObj: any = {};
          optionObj['label'] = option.label;
          optionObj['id'] = option.id;
          optionObj['count'] = 0;
          options.push(optionObj);
        }
        questionObj['options'] = options;
        questionObj['id'] = question.id;
        questionObj['responseCount'] = 0;
        questions.push(questionObj);
      }
      sectionObj['questions'] = questions;
      sectionObj['id'] = section.id;
      sections.push(sectionObj);
    }
    this.optionsFrequency['sections'] = sections;
  }

  countOptionsFrequency() {
    for (let res of this.responses.responses) {
      for (let section of res.sections || []) {
        for (let question of section.questions || []) {
          let selectedSection: any = this.optionsFrequency.sections.find(
            (_section: any) => _section.id == section.id
          );
          if (selectedSection) {
            let selectedQuestion: any = selectedSection.questions.find(
              (_question: any) => _question.id == question.id
            );
            if (selectedQuestion) {
              let responded: boolean = false;
              if (question && question.options)
                question.options.forEach((id: any) => {
                  const option = selectedQuestion.options.find(
                    (option: any) => option.id === id
                  );
                  if (option) {
                    option.count += 1;
                    responded = true;
                  }
                });
              if (responded) {
                selectedQuestion.responseCount += 1;
              }
            }
          }
        }
      }
    }
  }

  fetchQuestionResponse(sectionId: any, questionId: any) {
    const section = this.optionsFrequency.sections.find(
      (_section: any) => _section.id == sectionId
    );
    const question = section.questions.find(
      (_question: any) => _question.id == questionId
    );

    const labels: string[] = [];
    const count: number[] = [];
    for (let i = 0; i < question.options.length; i++) {
      labels.push(question.options[i]['label']);
      count.push(question.options[i]['count']);
    }
    return [labels, count, question['responseCount']];
  }

  initializeFormSummary() {
    for (let section of this.formData.sections) {
      let sectionObj: any = {};
      sectionObj['sectionName'] = section.name;
      let questions = [];
      for (let question of section.questions) {
        let questionObj: any = {};
        // get all response for this questionIndex and sectionIndex
        const [labels, count, responseCount] = this.fetchQuestionResponse(
          section.id,
          question.id
        );

        if (question.type.toLowerCase() == 'Checkboxes') {
          if (labels.length < 10) {
            questionObj.height = '200px';
          } else if (labels.length < 16) {
            questionObj.height = '300px';
          } else if (labels.length < 21) {
            questionObj.height = '400px';
          } else if (labels.length < 33) {
            questionObj.height = '600px';
          } else if (labels.length < 39) {
            questionObj.height = '700px';
          } else {
            questionObj.height = '800px';
          }
        }

        questionObj['questionText'] = question.label;
        questionObj['responseCount'] = responseCount;
        questionObj['labels'] = labels;
        questionObj['selector'] = `question-${section.id}-${question.id}`;
        questionObj['count'] = count;
        questionObj['count'] = count;
        questionObj['type'] = question.type;
        questions.push(questionObj);
      }
      sectionObj['questions'] = questions;
      this.formSummary.push(sectionObj);
    }
  }

  createCharts() {
    for (let section of this.formSummary) {
      for (let question of section.questions) {
        if (question.type == 'Multiple choice' && question.responseCount) {
          this.createPieChart(
            question.labels,
            question.count,
            question.selector
          );
        } else if (question.type == 'Checkboxes' && question.responseCount) {
          this.createBarChart(
            question.labels,
            question.count,
            question.questionText,
            question.selector
          );
        } else if (question.responseCount == 0) {
          const canvas = document.getElementById(question.selector);

          if (canvas) {
            canvas.remove(); // This will remove the canvas element from the DOM
          } else {
          }
        }
      }
    }
  }

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.formData.formId) {
      this.formResponsesService
        .fetchAllResponse(this.formData.formId)
        .subscribe((responseList: FormResponse) => {
          this.responses = responseList;
          this.initializeOptionsFrequency();
          this.countOptionsFrequency();
          this.initializeFormSummary();
          this.loader = false;
        });
    } else {
      this.loader = false;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createCharts();
    }, 500);
  }

  tabChange(tab: MatTabChangeEvent) {
    // this.selectedTab = tab;
  }

  createPieChart(
    labels: string[] = [],
    data: number[] = [],
    selector: string,
    backgroundColor: string[] = this.backgroundColor
  ) {
    new Chart(selector, {
      type: 'pie',

      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColor,
            hoverOffset: 5,
          },
        ],
      },
      options: {
        responsive: true, // Enables responsiveness
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: true,
            fullSize: true,
            position: 'right',
            labels: {
              color: 'black',
              boxWidth: 10,
            },
          },
        },
      },
    });
  }

  testChartItem: any = {};
  createBarChart(
    labels: string[] = [],
    data: number[] = [],
    label: string,
    selector: string
  ) {
    new Chart(selector, {
      type: 'bar',

      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: this.primaryColor,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            fullSize: true,
            position: 'right',
            labels: {
              color: 'black',
              boxWidth: 10,
            },
          },
        },
      },
    });
  }
}
