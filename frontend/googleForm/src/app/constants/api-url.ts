const baseUrl = 'http://localhost:8080/';

export const API_URLS = {
  FETCH_ALL_FORMS: baseUrl + 'api/v1/forms/user',
  USER_URL: 'assets/mock-data/user.json',
  FETCH_FORM_BY_ID: baseUrl + 'api/v1/forms',
  FETCH_ALL_RESPONSES: 'assets/mock-data/form-responses-list.json',
  FETCH_RESPONDENT_FORM: baseUrl + 'api/v1/forms/published',
  SAVE_FORM: baseUrl + 'api/v1/forms',
};

// FETCH_ALL_FORMS: 'assets/mock-data/fetch-all-forms.json',
// FETCH_FORM_BY_ID: 'assets/mock-data/sample-create-form.json',
// SAVE_FORM: 'assets/mock-data/save-form-response.json',
// FETCH_RESPONDENT_FORM: 'assets/mock-data/respondent-form.json',
