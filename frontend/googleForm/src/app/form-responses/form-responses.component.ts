import {
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-form-responses',
  templateUrl: './form-responses.component.html',
  styleUrls: ['./form-responses.component.css'],
})
export class FormResponsesComponent implements OnInit, AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {}
  selectedTab: string = 'Summary';
  tabs: string[] = ['Summary', 'Question', 'Individual'];
  primaryColor = 'rgb(103, 58, 183)';
  optionsFrequency: any = {};
  formSummary: any = [];
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

  responses: any = {
    formId: 234,
    responses: [
      {
        submittedOn: '2024-09-01',
        submittedBy: 'user-1',
        responseId: 123,
        sections: [
          {
            id: 1, // Corresponding to section-1
            questions: [
              {
                id: 1, // Question about favorite color (Checkboxes)
                options: [1], // Selected Blue and Green
              },
              {
                id: 2, // Question about favorite movie type (MCQ)
                options: [1], // Selected Action
              },
            ],
          },
          {
            id: 2, // Corresponding to section-2
            questions: [
              {
                id: 6, // Question about favorite season (MCQ)
                options: [2], // Selected Summer
              },
            ],
          },
        ],
      },
      {
        submittedOn: '2024-09-02',
        submittedBy: 'user-2',
        responseId: 124,
        sections: [
          {
            id: 1, // Corresponding to section-1
            questions: [
              {
                id: 1, // Question about favorite color (Checkboxes)
                options: [1, 2], // Selected Red and Yellow
              },
            ],
          },
          {
            id: 3, // Corresponding to section-3
            questions: [
              {
                id: 9, // Question about hobbies (Checkboxes)
                options: [1, 3], // Selected Reading and Cooking
              },
              {
                id: 10, // Question about music preference (MCQ)
                options: [2], // Selected Pop
              },
            ],
          },
        ],
      },
      {
        submittedOn: '2024-09-03',
        submittedBy: 'user-3',
        responseId: 125,
        sections: [
          {
            id: 4, // Corresponding to section-4
            questions: [
              {
                id: 13, // Question about cuisine preference (MCQ)
                options: [3], // Selected Mexican
              },
              {
                id: 15, // Question about drinks (Checkboxes)
                options: [1, 2], // Selected Water and Juice
              },
            ],
          },
        ],
      },
      {
        submittedOn: '2024-09-04',
        submittedBy: 'user-4',
        responseId: 126,
        sections: [
          {
            id: 2, // Corresponding to section-2
            questions: [
              {
                id: 5, // Question about favorite fruits (Checkboxes)
                options: [1, 3], // Selected Apple and Orange
              },
              {
                id: 7, // Question about outdoor activities (Checkboxes)
                options: [2, 4], // Selected Cycling and Camping
              },
            ],
          },
          {
            id: 3, // Corresponding to section-3
            questions: [
              {
                id: 12, // Question about vacation preference (MCQ)
                options: [2], // Selected Mountain vacation
              },
            ],
          },
        ],
      },
      {
        submittedOn: '2024-09-05',
        submittedBy: 'user-5',
        responseId: 127,
        sections: [
          {
            id: 1, // Corresponding to section-1
            questions: [
              {
                id: 2, // Question about movie preference (MCQ)
                options: [3], // Selected Drama
              },
            ],
          },
          {
            id: 4, // Corresponding to section-4
            questions: [
              {
                id: 16, // Question about favorite dessert (MCQ)
                options: [1], // Selected Ice Cream
              },
            ],
          },
        ],
      },
      {
        submittedOn: '2024-09-06',
        submittedBy: 'user-6',
        responseId: 128,
        sections: [
          {
            id: 1, // Corresponding to section-1
            questions: [
              {
                id: 4, // Question about tea or coffee (MCQ)
                options: [2], // Selected Coffee
              },
            ],
          },
          {
            id: 2, // Corresponding to section-2
            questions: [
              {
                id: 5, // Question about fruits (Checkboxes)
                options: [2], // Selected Banana
              },
              {
                id: 8, // Question about workout time (MCQ)
                options: [3], // Selected Evening
              },
            ],
          },
        ],
      },
      {
        submittedOn: '2024-09-07',
        submittedBy: 'user-7',
        responseId: 129,
        sections: [
          {
            id: 3, // Corresponding to section-3
            questions: [
              {
                id: 9, // Question about hobbies (Checkboxes)
                options: [2, 4], // Selected Traveling and Sports
              },
              {
                id: 10, // Question about music preference (MCQ)
                options: [3], // Selected Jazz
              },
            ],
          },
          {
            id: 4, // Corresponding to section-4
            questions: [
              {
                id: 14, // Question about takeout (Checkboxes)
                options: [1, 3], // Selected Pizza and Sushi
              },
            ],
          },
        ],
      },
      {
        submittedOn: '2024-09-08',
        submittedBy: 'user-8',
        responseId: 130,
        sections: [
          {
            id: 2, // Corresponding to section-2
            questions: [
              {
                id: 7, // Question about outdoor activities (Checkboxes)
                options: [1], // Selected Hiking
              },
              {
                id: 6, // Question about favorite season (MCQ)
                options: [4], // Selected Winter
              },
            ],
          },
          {
            id: 4, // Corresponding to section-4
            questions: [
              {
                id: 16, // Question about favorite dessert (MCQ)
                options: [2], // Selected Cake
              },
            ],
          },
        ],
      },
      {
        submittedOn: '2024-09-09',
        submittedBy: 'user-9',
        responseId: 131,
        sections: [
          {
            id: 3, // Corresponding to section-3
            questions: [
              {
                id: 11, // Question about reading material (Checkboxes)
                options: [1, 3], // Selected Books and Magazines
              },
            ],
          },
          {
            id: 4, // Corresponding to section-4
            questions: [
              {
                id: 13, // Question about cuisine preference (MCQ)
                options: [2], // Selected Chinese
              },
              {
                id: 15, // Question about drinks (Checkboxes)
                options: [2, 4], // Selected Juice and Coffee
              },
            ],
          },
        ],
      },
    ],
  };

  formData: any = {
    formName: 'My form',
    formId: null,
    sections: [
      {
        id: 1,
        name: 'Untitled Section',
        description: 'Section 1 description',
        shuffle: true,
        questions: [
          {
            id: 1,
            label: 'What is your favorite color?',
            type: 'checkbox',
            shuffle: true,
            required: true,
            options: [
              { id: 1, label: 'Red' },
              { id: 2, label: 'Blue' },
            ],
          },
          {
            id: 2,
            label: 'What type of movies do you like?',
            type: 'mcq',
            shuffle: false,
            required: true,
            options: [
              { id: 1, label: 'Action' },
              { id: 2, label: 'Comedy' },
              { id: 3, label: 'Drama' },
            ],
          },
          {
            id: 3,
            label: 'What pets do you have?',
            type: 'checkbox',
            shuffle: true,
            required: false,
            options: [
              { id: 1, label: 'Dog' },
              { id: 2, label: 'Cat' },
              { id: 3, label: 'Bird' },
              { id: 4, label: 'Fish' },
            ],
          },
          {
            id: 4,
            label: 'Do you prefer tea or coffee?',
            type: 'mcq',
            shuffle: false,
            required: true,
            options: [
              { id: 1, label: 'Tea' },
              { id: 2, label: 'Coffee' },
            ],
          },
        ],
      },
      {
        id: 2,
        name: 'section-2',
        description: 'Section 2 description',
        shuffle: false,
        questions: [
          {
            id: 5,
            label: 'Which fruits do you like?',
            type: 'checkbox',
            shuffle: false,
            required: false,
            options: [
              { id: 1, label: 'Apple' },
              { id: 2, label: 'Banana' },
              { id: 3, label: 'Orange' },
            ],
          },
          {
            id: 6,
            label: 'What is your favorite season?',
            type: 'mcq',
            shuffle: true,
            required: true,
            options: [
              { id: 1, label: 'Spring' },
              { id: 2, label: 'Summer' },
              { id: 3, label: 'Fall' },
              { id: 4, label: 'Winter' },
            ],
          },
          {
            id: 7,
            label: 'Which outdoor activities do you enjoy?',
            type: 'checkbox',
            shuffle: true,
            required: false,
            options: [
              { id: 1, label: 'Hiking' },
              { id: 2, label: 'Cycling' },
              { id: 3, label: 'Running' },
              { id: 4, label: 'Camping' },
            ],
          },
          {
            id: 8,
            label: 'What is your preferred workout time?',
            type: 'mcq',
            shuffle: false,
            required: true,
            options: [
              { id: 1, label: 'Morning' },
              { id: 2, label: 'Afternoon' },
              { id: 3, label: 'Evening' },
            ],
          },
        ],
      },
      {
        id: 3,
        name: 'section-3',
        description: 'Section 3 description',
        shuffle: true,
        questions: [
          {
            id: 9,
            label: 'Select the hobbies you enjoy',
            type: 'checkbox',
            shuffle: true,
            required: false,
            options: [
              { id: 1, label: 'Reading' },
              { id: 2, label: 'Traveling' },
              { id: 3, label: 'Cooking' },
              { id: 4, label: 'Sports' },
            ],
          },
          {
            id: 10,
            label: 'What kind of music do you prefer?',
            type: 'mcq',
            shuffle: false,
            required: true,
            options: [
              { id: 1, label: 'Rock' },
              { id: 2, label: 'Pop' },
              { id: 3, label: 'Jazz' },
              { id: 4, label: 'Classical' },
            ],
          },
          {
            id: 11,
            label: 'What do you use for reading?',
            type: 'checkbox',
            shuffle: true,
            required: false,
            options: [
              { id: 1, label: 'Books' },
              { id: 2, label: 'E-Books' },
              { id: 3, label: 'Magazines' },
            ],
          },
          {
            id: 12,
            label: 'Which type of vacation do you prefer?',
            type: 'mcq',
            shuffle: true,
            required: true,
            options: [
              { id: 1, label: 'Beach' },
              { id: 2, label: 'Mountain' },
              { id: 3, label: 'City' },
            ],
          },
        ],
      },
      {
        id: 4,
        name: 'section-4',
        description: 'Section 4 description',
        shuffle: false,
        questions: [
          {
            id: 13,
            label: 'Which type of cuisine do you prefer?',
            type: 'mcq',
            shuffle: false,
            required: true,
            options: [
              { id: 1, label: 'Italian' },
              { id: 2, label: 'Chinese' },
              { id: 3, label: 'Mexican' },
              { id: 4, label: 'Indian' },
            ],
          },
          {
            id: 14,
            label: 'What do you usually order for takeout?',
            type: 'checkbox',
            shuffle: true,
            required: false,
            options: [
              { id: 1, label: 'Pizza' },
              { id: 2, label: 'Burgers' },
              { id: 3, label: 'Sushi' },
              { id: 4, label: 'Pasta' },
            ],
          },
          {
            id: 15,
            label: 'Which drinks do you enjoy?',
            type: 'checkbox',
            shuffle: true,
            required: false,
            options: [
              { id: 1, label: 'Water' },
              { id: 2, label: 'Juice' },
              { id: 3, label: 'Soda' },
              { id: 4, label: 'Coffee' },
            ],
          },
          {
            id: 16,
            label: 'Which dessert do you prefer?',
            type: 'mcq',
            shuffle: true,
            required: true,
            options: [
              { id: 1, label: 'Ice Cream' },
              { id: 2, label: 'Cake' },
              { id: 3, label: 'Pie' },
            ],
          },
        ],
      },
    ],
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
      for (let section of res.sections) {
        for (let question of section.questions) {
          // find section
          let selectedSection: any = this.optionsFrequency.sections.find(
            (_section: any) => _section.id == section.id
          );
          if (selectedSection) {
            // find question
            let selectedQuestion: any = selectedSection.questions.find(
              (_question: any) => _question.id == question.id
            );
            if (selectedQuestion) {
              // update count
              //count response
              let responded: boolean = false;
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

        if (question.type.toLowerCase() == 'checkbox') {
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
        if (question.type == 'mcq' && question.responseCount) {
          this.createPieChart(
            question.labels,
            question.count,
            question.selector
          );
        } else if (question.type == 'checkbox' && question.responseCount) {
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

  ngOnInit(): void {
    this.initializeOptionsFrequency();
    this.countOptionsFrequency();
    this.initializeFormSummary();
  }

  ngAfterViewInit() {
    this.createCharts();
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
