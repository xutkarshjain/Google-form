import { Template } from '../models/template';

export const FORM_TEMPLATES: { [key: string]: Template } = {
  template1: {
    image: 'assets/images/formsBlank.png',
    label: 'Blank form',
    formId: '123',
    templateId: '1',
  },
  template2: {
    image: 'assets/images/RSVP.png',
    label: 'RSVP',
    formId: '123',
    templateId: '2',
  },
  template3: {
    image: 'assets/images/contact_info.png',
    label: 'Contact Information',
    formId: '123',
    templateId: '3',
  },
  template4: {
    image: 'assets/images/party_invite.png',
    label: 'Party Invite',
    formId: '123',
    templateId: '4',
  },
  template5: {
    image: 'assets/images/t-shirt.png',
    label: 'T-Shirt Sign Up',
    formId: '123',
    templateId: '5',
  },
  template6: {
    image: 'assets/images/event-registration.png',
    label: 'Event Registration',
    formId: '123',
    templateId: '6',
  },
};
