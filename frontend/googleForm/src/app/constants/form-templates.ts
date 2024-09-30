import { Template } from '../models/template';

export const FORM_TEMPLATES: { [key: string]: Template } = {
  template1: {
    image: 'assets/formsBlank.png',
    label: 'Blank form',
    formId: '123',
    templateId: '1',
  },
  template2: {
    image: 'assets/RSVP.png',
    label: 'RSVP',
    formId: '123',
    templateId: '2',
  },
  template3: {
    image: 'assets/contact_info.png',
    label: 'Contact Information',
    formId: '123',
    templateId: '3',
  },
  template4: {
    image: 'assets/party_invite.png',
    label: 'Party Invite',
    formId: '123',
    templateId: '4',
  },
  template5: {
    image: 'assets/t-shirt.png',
    label: 'T-Shirt Sign Up',
    formId: '123',
    templateId: '5',
  },
  template6: {
    image: 'assets/event-registration.png',
    label: 'Event Registration',
    formId: '123',
    templateId: '6',
  },
};
