import { Form } from '../models/form';
export const defaultData: Form = {
  formId: null,
  formName: 'Untitled-form',
  sections: [
    {
      id: null,
      name: 'Untitled Section',
      description: '',
      shuffle: true,
      questions: [
        {
          id: null,
          label: 'Question',
          type: 'Checkboxes',
          shuffle: true,
          required: true,
          options: [{ id: null, label: 'Option 1' }],
        },
      ],
    },
  ],
};
