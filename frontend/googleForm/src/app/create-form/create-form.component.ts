import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent implements OnInit {
  sectionName: string = 'Untitled Section';
  sectionDescription: string = '';
  selectedId: any;

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
          questionId: 1,
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
          ],
        },
        {
          questionId: 2,
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
    {
      sectionName: 'Untitled Section',
      sectionId: 2,
      sectionDescription: '',
      selected: true,
      shuffleQuestions: true,
      sectionPriority: 1,
      questions: [
        {
          questionId: 1,
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
          ],
        },
        {
          questionId: 2,
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
  ngOnInit(): void {
    console.log('oninit');
  }

  updateSelected(id: any) {
    this.selectedId = id;
  }
}
