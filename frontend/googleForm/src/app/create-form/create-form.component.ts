import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  sectionName: string = 'Untitled Section';
  sectionDescription: string = '';
  selectedItem: any = {
    id: null,
    type: '',
  };

  sections: any = [
    {
      sectionName: 'Untitled Section',
      sectionId: 1,
      sectionDescription: '',
      selected: true,
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

  questionTypes: any = [
    { value: 'mcq', viewValue: 'Multiple choice' },
    { value: 'select', viewValue: 'Checkboxes' },
  ];
  ngOnInit(): void {
    console.log('oninit');
  }

  updateSelected(id: any, type: string) {
    this.selectedItem.id = id;
    this.selectedItem.type = type;
  }
}
