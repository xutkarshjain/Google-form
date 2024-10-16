export interface option {
  id: number;
  label: string;
}

export interface question {
  id: number;
  label: string;
  type: string;
  required: boolean;
  options: option[];
}

export interface section {
  id: number;
  name: string;
  description: string;
  questions: question[];
}

export interface form {
  formId: string;
  sections: section[];
}
