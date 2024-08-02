export interface option {
  id: number;
  text: string;
}

export interface question {
  id: number;
  text: string;
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
  id: number;
  sections: section[];
}
