import { useGetFormsQuery } from "../../store/api";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { data: forms, isLoading } = useGetFormsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Forms</h1>
      <Link to="/forms/new">Create New Form</Link>

      {forms?.map(function (form) {
        return (
          <div key={form.id}>
            <h2>{form.title}</h2>
            <Link to={`/forms/${form.id}/fill`}>Fill Form</Link>
            {" | "}
            <Link to={`/forms/${form.id}/responses`}>Responses</Link>
          </div>
        );
      })}
    </div>
  );
}
