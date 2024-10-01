import { Template } from '../models/template';

export const FORM_TEMPLATES: { [key: string]: Template } = {
  template1: {
    image: 'assets/images/formsBlank.png',
    label: 'Blank form',
    templateId: '0',
  },
  template2: {
    image: 'assets/images/contact_info.png',
    label: 'Contact Information',
    templateId: '1',
  },
  template3: {
    image: 'assets/images/RSVP.png',
    label: 'RSVP',
    templateId: '2',
  },
  template4: {
    image: 'assets/images/party_invite.png',
    label: 'Party Invite',
    templateId: '3',
  },
  template5: {
    image: 'assets/images/t-shirt.png',
    label: 'T-Shirt Sign Up',
    templateId: '4',
  },
  template6: {
    image: 'assets/images/event-registration.png',
    label: 'Event Registration',
    templateId: '5',
  },
};
