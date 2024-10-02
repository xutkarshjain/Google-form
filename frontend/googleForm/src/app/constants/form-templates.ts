import { Template } from '../models/template';

export const FORM_TEMPLATES: { [key: string]: Template } = {
  template0: {
    image: 'assets/images/formsBlank.png',
    label: 'Blank form',
    templateId: '0',
  },
  template1: {
    image: 'assets/images/contact_info.png',
    label: 'Contact Information',
    templateId: '1',
    details: {
      formName: 'temp1 form',
      formId: null,
      sections: [
        {
          id: 1,
          name: 'section-1',
          description: 'desc-1',
          shuffle: true,
          questions: [
            {
              id: 1,
              label: 'question-1',
              type: 'Checkboxes',
              shuffle: true,
              required: true,
              options: [
                { id: 1, label: 'option-1' },
                { id: 2, label: 'option-2' },
                { id: 3, label: 'option-3' },
              ],
            },
            {
              id: 2,
              label: 'question-2',
              type: 'Multiple choice',
              shuffle: false,
              required: false,
              options: [
                { id: 1, label: 'option-A' },
                { id: 2, label: 'option-B' },
              ],
            },
          ],
        },
      ],
    },
  },
  template2: {
    image: 'assets/images/RSVP.png',
    label: 'RSVP',
    templateId: '2',
    details: {
      formName: 'temp2 form',
      formId: null,
      sections: [
        {
          id: 1,
          name: 'section-1',
          description: 'desc-1',
          shuffle: true,
          questions: [
            {
              id: 1,
              label: 'question-1',
              type: 'Checkboxes',
              shuffle: true,
              required: true,
              options: [
                { id: 1, label: 'option-1' },
                { id: 2, label: 'option-2' },
                { id: 3, label: 'option-3' },
              ],
            },
            {
              id: 2,
              label: 'question-2',
              type: 'Multiple choice',
              shuffle: false,
              required: false,
              options: [
                { id: 1, label: 'option-A' },
                { id: 2, label: 'option-B' },
              ],
            },
          ],
        },
      ],
    },
  },
  template3: {
    image: 'assets/images/party_invite.png',
    label: 'Party Invite',
    templateId: '3',
    details: {
      formName: 'temp3 form',
      formId: null,
      sections: [
        {
          id: 1,
          name: 'section-1',
          description: 'desc-1',
          shuffle: true,
          questions: [
            {
              id: 1,
              label: 'question-1',
              type: 'Checkboxes',
              shuffle: true,
              required: true,
              options: [
                { id: 1, label: 'option-1' },
                { id: 2, label: 'option-2' },
                { id: 3, label: 'option-3' },
              ],
            },
            {
              id: 2,
              label: 'question-2',
              type: 'Multiple choice',
              shuffle: false,
              required: false,
              options: [
                { id: 1, label: 'option-A' },
                { id: 2, label: 'option-B' },
              ],
            },
          ],
        },
      ],
    },
  },
  template4: {
    image: 'assets/images/t-shirt.png',
    label: 'T-Shirt Sign Up',
    templateId: '4',
    details: {
      formName: 'temp4 form',
      formId: null,
      sections: [
        {
          id: 1,
          name: 'section-1',
          description: 'desc-1',
          shuffle: true,
          questions: [
            {
              id: 1,
              label: 'question-1',
              type: 'Checkboxes',
              shuffle: true,
              required: true,
              options: [
                { id: 1, label: 'option-1' },
                { id: 2, label: 'option-2' },
                { id: 3, label: 'option-3' },
              ],
            },
            {
              id: 2,
              label: 'question-2',
              type: 'Multiple choice',
              shuffle: false,
              required: false,
              options: [
                { id: 1, label: 'option-A' },
                { id: 2, label: 'option-B' },
              ],
            },
          ],
        },
      ],
    },
  },
  template5: {
    image: 'assets/images/event-registration.png',
    label: 'Event Registration',
    templateId: '5',
    details: {
      formName: 'temp5 form',
      formId: null,
      sections: [
        {
          id: 1,
          name: 'section-1',
          description: 'desc-1',
          shuffle: true,
          questions: [
            {
              id: 1,
              label: 'question-1',
              type: 'Checkboxes',
              shuffle: true,
              required: true,
              options: [
                { id: 1, label: 'option-1' },
                { id: 2, label: 'option-2' },
                { id: 3, label: 'option-3' },
              ],
            },
            {
              id: 2,
              label: 'question-2',
              type: 'Multiple choice',
              shuffle: false,
              required: false,
              options: [
                { id: 1, label: 'option-A' },
                { id: 2, label: 'option-B' },
              ],
            },
          ],
        },
      ],
    },
  },
};
