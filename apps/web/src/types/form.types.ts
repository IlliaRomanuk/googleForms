// export type QuestionType = "TEXT" | "MULTIPLE_CHOICE";

// export interface BaseQuestion {
//   id: string;
//   title: string;
//   type: QuestionType;
// }

// export interface ChoiceQuestion extends BaseQuestion {
//   options: string[];
// }

// export type Question = BaseQuestion | ChoiceQuestion;

// export interface Form {
//   id: string;
//   title: string;
//   description?: string;
//   questions: Question[];
// }

// export interface Answer {
//   questionId: string;
//   value: string | string[];
// }

// export interface FormResponse {
//   id: string;
//   formId: string;
//   answers: Answer[];
// }
// export interface BuilderQuestion {
//   id: string;
//   title: string;
//   type: QuestionType;
//   options?: string[];
// }


// export type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "DATE";

export interface BuilderQuestion {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
}

// export interface Form {
//   id: string;
//   title: string;
//   description?: string;
//   questions: BuilderQuestion[];
// }

// export interface FormResponse {
//   id: string;
//   formId: string;
//   answers: {
//     questionId: string;
//     value: string;
//   }[];
// }

// types/form.types.ts
export type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "DATE";

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: string;
}

// Переименовал Response в FormResponse
export interface FormResponse {
  id: string;
  formId: string;
  answers: Answer[];
}