import React from "react";
import { Form } from "../../types/form.types";
import FormItem from "./FormItem";

interface Props {
  forms: Form[];
}

const FormList: React.FC<Props> = ({ forms }) => {
  return (
    <div>
      {forms.map((form) => (
        <FormItem key={form.id} form={form} />
      ))}
    </div>
  );
};

export default FormList;
