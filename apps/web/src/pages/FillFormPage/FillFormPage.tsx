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
