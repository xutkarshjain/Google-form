export interface option {
  id?: number | null;
  label: string;
}

export interface question {
  id?: string | null;
  label: string;
  type: string;
  shuffle: boolean;
  required: boolean;
  options: option[];
}

export interface section {
  id?: string | null;
  name: string;
  description: string;
  shuffle: boolean;
  questions: question[];
}

export interface Form {
  formId?: string | null;
  formName: string;
  sections: section[];
}

export interface SaveFormResponse {
  formId: string;
}
