
// import type { Form } from "../../types/form.types";
// import { useNavigate } from 'react-router-dom';
// import { useState } from "react";
// const HomePage = () => {
//   const navigate = useNavigate()
//   const [forms, setForms] = useState<Form[]>([])

//   return (
//     <div>
//       <h1>My Forms</h1>

//       <button onClick={() => navigate("/create")}>
//         Create Form
//       </button>

//       {forms.map((form) => (
//         <div key={form.id}>
//           <h3>{form.title}</h3>

//           <button onClick={() => navigate(`/form/${form.id}`)}>
//             Open
//           </button>

//           <button>
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   )
// }
// export default HomePage;



// import { Link } from "react-router-dom";
// import { useGetFormsQuery } from "../../api/formsApi";

// export default function HomePage() {

//   const { data: forms, isLoading } = useGetFormsQuery();

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div>

//       <h1>Forms</h1>

//       <Link to="/forms/new">
//         <button>Create Form</button>
//       </Link>

//       {forms?.map(form => (
//         <div key={form.id}>

//           <h3>{form.title}</h3>

//           <Link to={`/forms/${form.id}/fill`}>
//             Fill
//           </Link>

//           <Link to={`/forms/${form.id}/responses`}>
//             Responses
//           </Link>

//         </div>
//       ))}

//     </div>
//   );
// }

// import React from "react";
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
            <Link to={`/forms/${form.id}/fill`}>Fill Form</Link>{" | "}
            <Link to={`/forms/${form.id}/responses`}>Responses</Link>
          </div>
        );
      })}
    </div>
  );
}