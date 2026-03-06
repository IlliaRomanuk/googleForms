// import { useState } from "react";
// import { v4 as uuid } from "uuid";
// import { Question } from "../types/form.types";

// export function useFormBuilder() {

//   const [title, setTitle] = useState("");
//   const [questions, setQuestions] = useState<Question[]>([]);

//   const addQuestion = () => {
//     setQuestions(prev => [
//       ...prev,
//       {
//         id: uuid(),
//         title: "",
//         type: "TEXT",
//         options: []
//       }
//     ]);
//   };

//   const updateQuestion = (id: string, data: Partial<Question>) => {
//     setQuestions(prev =>
//       prev.map(q => q.id === id ? { ...q, ...data } : q)
//     );
//   };

//   const removeQuestion = (id: string) => {
//     setQuestions(prev => prev.filter(q => q.id !== id));
//   };

//   return {
//     title,
//     setTitle,
//     questions,
//     addQuestion,
//     updateQuestion,
//     removeQuestion
//   };
// }
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BuilderQuestion, QuestionType } from "../types/form.types";

export const useFormBuilder = () => {
  const [questions, setQuestions] = useState<BuilderQuestion[]>([]);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: BuilderQuestion = {
      id: uuidv4(),
      title: "",
      type,
      options: type === "MULTIPLE_CHOICE" || type === "CHECKBOX" ? [""] : undefined,
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const updateQuestion = (id: string, updated: Partial<BuilderQuestion>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updated } : q))
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: [...(q.options || []), ""] }
          : q
      )
    );
  };

  const updateOption = (questionId: string, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId && q.options
          ? { ...q, options: q.options.map((opt, i) => (i === index ? value : opt)) }
          : q
      )
    );
  };

  const removeOption = (questionId: string, index: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId && q.options
          ? { ...q, options: q.options.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  return {
    questions,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addOption,
    updateOption,
    removeOption,
  };
};