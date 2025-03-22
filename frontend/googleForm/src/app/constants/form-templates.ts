import { Template } from '../models/template';
import { QuestionType } from './question-types.enum';

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
      formId: null,
      formName: 'Contact Form',
      sections: [
        {
          id: null,
          name: '',
          description: '',
          shuffle: false,
          questions: [
            {
              id: null,
              label: 'How would you like us to contact you?',
              type: 'single_select',
              required: true,
              options: [
                { id: null, label: 'Phone Call' },
                { id: null, label: 'Email' },
                { id: null, label: 'WhatsApp' },
                { id: null, label: 'SMS' },
              ],
            },
            {
              id: null,
              label: 'When is the most convenient time for us to contact you?',
              type: 'single_select',
              required: true,
              options: [
                { id: null, label: ' Morning (8 AM - 12 PM)' },
                { id: null, label: 'Afternoon (12 PM - 5 PM)' },
                { id: null, label: 'Evening (5 PM - 9 PM)' },
                { id: null, label: 'Anytime' },
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
      formId: null,
      formName: 'RSVP Form',
      sections: [
        {
          id: null,
          name: 'Event Attendance',
          description: 'Confirm your attendance',
          shuffle: false,
          questions: [
            {
              id: null,
              label: 'Will you attend?',
              type: 'single_select',
              required: true,
              options: [
                { id: null, label: 'Yes' },
                { id: null, label: 'No' },
                { id: null, label: 'Maybe' },
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
      formId: null,
      formName: 'Party Invitation Form',
      sections: [
        {
          id: null,
          name: 'RSVP for Party',
          description: 'Let us know if you can join',
          shuffle: false,
          questions: [
            {
              id: null,
              label: 'Will you attend?',
              type: 'single_select',
              required: true,
              options: [
                { id: null, label: 'Yes' },
                { id: null, label: 'No' },
                { id: null, label: 'Maybe' },
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
      formId: null,
      formName: 'T-Shirt Order Form',
      sections: [
        {
          id: null,
          name: 'T-Shirt Selection',
          description: 'Choose your preferred size and color',
          shuffle: false,
          questions: [
            {
              id: null,
              label: 'Size',
              type: 'single_select',
              required: true,
              options: [
                { id: null, label: 'Small' },
                { id: null, label: 'Medium' },
                { id: null, label: 'Large' },
                { id: null, label: 'XL' },
              ],
            },
            {
              id: null,
              label: 'Color',
              type: 'single_select',
              required: true,
              options: [
                { id: null, label: 'Red' },
                { id: null, label: 'Blue' },
                { id: null, label: 'Black' },
                { id: null, label: 'White' },
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
      formId: null,
      formName: 'Event Registration Form',
      sections: [
        {
          id: null,
          name: 'Event Sign-Up',
          description: 'Register for the event',
          shuffle: false,
          questions: [
            {
              id: null,
              label: 'Will you be attending?',
              type: 'single_select',
              required: true,
              options: [
                { id: null, label: 'Yes' },
                { id: null, label: 'No' },
                { id: null, label: 'Maybe' },
              ],
            },
          ],
        },
      ],
    },
  },
};
