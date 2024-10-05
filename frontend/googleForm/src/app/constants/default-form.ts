import { Form } from '../models/form';
export const defaultData: Form = {
  formId: null,
  formName: 'Untitled form',
  sections: [
    {
      id: null,
      name: 'Untitled Section',
      description: '',
      shuffle: false,
      questions: [
        {
          id: null,
          label: 'Question',
          type: 'Checkboxes',
          shuffle: false,
          required: false,
          options: [{ id: null, label: 'Option' }],
        },
      ],
    },
  ],
};
