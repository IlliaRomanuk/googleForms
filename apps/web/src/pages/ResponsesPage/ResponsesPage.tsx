// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import type { Form, Question, FormResponse, Answer } from "../../types/form.types";

// const mockForms: Form[] = [
//   {
//     id: "1",
//     title: "Sample Form",
//     description: "This is a sample form",
//     questions: [
//       { id: "q1", title: "Your Name", type: "TEXT" },
//       { id: "q2", title: "Favorite Color", type: "MULTIPLE_CHOICE", options: ["Red", "Green", "Blue"] },
//     ],
//   },
// ];

// const mockResponses: FormResponse[] = [
//   {
//     id: "r1",
//     formId: "1",
//     answers: [
//       { questionId: "q1", value: "Alice" },
//       { questionId: "q2", value: "Red" },
//     ],
//   },
//   {
//     id: "r2",
//     formId: "1",
//     answers: [
//       { questionId: "q1", value: "Bob" },
//       { questionId: "q2", value: "Blue" },
//     ],
//   },
// ];

// const ResponsesPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [form, setForm] = useState<Form | null>(null);
//   const [responses, setResponses] = useState<FormResponse[]>([]);

//   useEffect(() => {
//     // TODO: заменить на GraphQL fetch
//     const f = mockForms.find((f) => f.id === id);
//     if (f) setForm(f);

//     const formResponses = mockResponses.filter((r) => r.formId === id);
//     setResponses(formResponses);
//   }, [id]);

//   if (!form) return <p>Loading form...</p>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Responses for "{form.title}"</h1>
//       {responses.length === 0 && <p>No responses yet.</p>}

//       {responses.map((response, idx) => (
//         <div key={response.id} style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
//           <h3>Response #{idx + 1}</h3>
//           {form.questions.map((q) => {
//             const answer = response.answers.find((a) => a.questionId === q.id);
//             return (
//               <p key={q.id}>
//                 <strong>{q.title}:</strong>{" "}
//                 {answer ? (Array.isArray(answer.value) ? answer.value.join(", ") : answer.value) : "No answer"}
//               </p>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ResponsesPage;
import { useParams } from "react-router-dom";
import { useGetFormQuery, useGetResponsesQuery } from "../../store/api";
import { FormResponse } from "../../types/form.types";

export default function ResponsesPage() {
  const { id } = useParams<{ id: string }>();

  const { data: form, isLoading: isFormLoading } = useGetFormQuery(id!);
  const { data: responses, isLoading: isResponsesLoading } =
    useGetResponsesQuery(id!);

  if (isFormLoading || isResponsesLoading) return <p>Loading...</p>;
  if (!form) return <p>Form not found</p>;
  if (!responses || responses.length === 0) return <p>No responses yet.</p>;

  return (
    <div>
      <h1>Responses for {form.title}</h1>

      {responses.map((response: FormResponse) => (
        <div key={response.id} style={{ marginBottom: "1rem" }}>
          {response.answers.map((answer) => {
            // Найдём вопрос по questionId
            const question = form.questions.find((q) => q.id === answer.questionId);

            if (!question) return null; // безопасная проверка

            return (
              <p key={answer.questionId}>
                <strong>{question.title}</strong>: {answer.value}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
}