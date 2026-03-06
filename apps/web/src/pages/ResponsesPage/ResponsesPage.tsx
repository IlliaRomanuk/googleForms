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
            const question = form.questions.find(
              (q) => q.id === answer.questionId
            );

            if (!question) return null;

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
