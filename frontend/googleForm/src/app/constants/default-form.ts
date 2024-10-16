import { Form } from '../models/form';
import { QuestionType } from './question-types.enum';
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
          type: QuestionType.single_select,
          shuffle: false,
          required: false,
          options: [{ id: null, label: 'Option' }],
        },
      ],
    },
  ],
};
