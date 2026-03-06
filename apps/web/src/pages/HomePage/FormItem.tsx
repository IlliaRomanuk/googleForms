import React from "react";
import { Form } from "../../types/form.types";
import { Link } from "react-router-dom";
interface Props {
  form: Form;
}

const FormItem: React.FC<Props> = ({ form }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "8px 0" }}>
      <h2>{form.title}</h2>
      <p>{form.description}</p>
      <Link to={`/forms/${form.id}/fill`}>Fill Form</Link> |{" "}
      <Link to={`/forms/${form.id}/responses`}>View Responses</Link>
    </div>
  );
};

export default FormItem;
