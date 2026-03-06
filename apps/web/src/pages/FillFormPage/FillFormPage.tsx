// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import type { Form, Question, Answer } from "../../types/form.types";

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

// const FillFormPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [form, setForm] = useState<Form | null>(null);
//   const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

//   useEffect(() => {
//     // TODO: заменить на GraphQL fetch
//     const f = mockForms.find((f) => f.id === id);
//     if (f) setForm(f);
//   }, [id]);

//   const handleChange = (question: Question, value: string | string[]) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [question.id]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     if (!form) return;

//     const response = {
//       formId: form.id,
//       answers: Object.entries(answers).map(([questionId, value]) => ({ questionId, value })),
//     };

//     console.log("Submitting response:", response);
//     alert("Form submitted! (mock)");

//     // После submit можно перейти на /forms/:id/responses
//     navigate(`/forms/${form.id}/responses`);
//   };

//   if (!form) return <p>Loading form...</p>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>{form.title}</h1>
//       {form.description && <p>{form.description}</p>}

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSubmit();
//         }}
//       >
//         {form.questions.map((q) => (
//           <div key={q.id} style={{ marginBottom: 15 }}>
//             <label>
//               <strong>{q.title}</strong>
//             </label>
//             <div>
//               {q.type === "TEXT" && (
//                 <input
//                   type="text"
//                   value={answers[q.id] as string || ""}
//                   onChange={(e) => handleChange(q, e.target.value)}
//                 />
//               )}

//               {q.type === "MULTIPLE_CHOICE" && "options" in q && (
//                 q.options!.map((opt) => (
//                   <div key={opt}>
//                     <label>
//                       <input
//                         type="radio"
//                         name={q.id}
//                         value={opt}
//                         checked={answers[q.id] === opt}
//                         onChange={() => handleChange(q, opt)}
//                       />{" "}
//                       {opt}
//                     </label>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         ))}

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default FillFormPage;
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetFormQuery, useSubmitResponseMutation } from "../../store/api";

export default function FillFormPage() {
  const { id } = useParams();

  const { data: form, isLoading } = useGetFormQuery(id!);

  const [submitResponse] = useSubmitResponseMutation();

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  if (isLoading) return <p>Loading...</p>;
  if (!form) return <p>Form not found</p>;

  const handleChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, value]) => ({
        questionId,
        value,
      })
    );

    await submitResponse({
      formId: form.id,
      answers: formattedAnswers,
    });

    alert("Form submitted!");
  };

  return (
    <div>
      <h1>{form.title}</h1>
      <p>{form.description}</p>

      {form.questions.map((q) => (
        <div key={q.id}>
          <p>{q.title}</p>

          {q.type === "TEXT" && (
            <input
              type="text"
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === "DATE" && (
            <input
              type="date"
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === "MULTIPLE_CHOICE" &&
            q.options?.map((opt) => (
              <label key={opt}>
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  onChange={() => handleChange(q.id, opt)}
                />
                {opt}
              </label>
            ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
