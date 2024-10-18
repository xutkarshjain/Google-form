export interface FormResponse {
  responses: Response[]; // Responses will always be an array, but it can be empty
}

interface Response {
  submittedOn: string;
  submittedBy: string;
  responseId: number;
  sections?: Section[]; // Sections can be optional or empty
}

interface Section {
  id: number;
  questions?: Question[]; // Questions can be optional or empty
}

interface Question {
  id: number;
  options?: number[]; // Options can be optional or empty
}
