export interface FormDetails {
  formId: string;
  formName: string;
  createdBy: string;
  modifiedOn: string;
}

export interface FormDetailResponse {
  forms: FormDetails[];
}
