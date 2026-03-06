import { BuilderQuestion } from "../types/form.types";

export interface QuestionItemProps {
  question: BuilderQuestion;
  onChange: (updated: BuilderQuestion) => void;
  onRemove: () => void;
}
