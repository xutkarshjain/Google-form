import { Component } from '@angular/core';
import { form } from '../models/view-form.model';
import { min } from 'rxjs';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css'],
})
export class ViewFormComponent {
  currentSectionindex: number = 0;
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
          {
            id: 1,
            text: 'question-2',
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

  getFirstSection() {
    return { id: 1, name: 'Section-1', description: 'desc-1', shuffle: true };
  }

  nextSection() {
    this.currentSectionindex += 1;
  }

  backSection() {
    this.currentSectionindex = Math.max(0, this.currentSectionindex - 1);
  }

  submitForm() {}
}
