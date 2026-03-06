// import { useState } from "react";
// import { useFormBuilder } from "../hooks/useForm";
// import OptionItem from "../components/OptionItem";
// import { BuilderQuestion } from "../types/form.types";

// const FormBuilderPage = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const {
//     questions,
//     addQuestion,
//     updateQuestion,
//     removeQuestion,
//     addOption,
//     updateOption,
//     removeOption,
//   } = useFormBuilder();

//   const handleQuestionTitleChange = (question: BuilderQuestion, value: string) => {
//     updateQuestion(question.id, { ...question, title: value });
//   };

//   const handleSave = () => {
//     const form = {
//       id: crypto.randomUUID(),
//       title,
//       description,
//       questions,
//     };

//     console.log("FORM CREATED:", form);
//     alert("Form saved (mock)");
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Create Form</h1>

//       <div>
//         <input
//           placeholder="Form title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <br />

//         <textarea
//           placeholder="Form description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>

//       <hr />

//       <h2>Questions</h2>

//       <button onClick={() => addQuestion("TEXT")}>Add Text Question</button>
//       <button onClick={() => addQuestion("MULTIPLE_CHOICE")}>
//         Add Multiple Choice
//       </button>

//       {questions.map((question) => (
//         <div
//           key={question.id}
//           style={{
//             border: "1px solid #ccc",
//             marginTop: 10,
//             padding: 10,
//           }}
//         >
//           <input
//             placeholder="Question title"
//             value={question.title}
//             onChange={(e) =>
//               handleQuestionTitleChange(question, e.target.value)
//             }
//           />

//           <p>Type: {question.type}</p>

//           {question.type === "MULTIPLE_CHOICE" && (
//             <div>
//               <h4>Options</h4>

//               {question.options?.map((opt, index) => (
//                 <OptionItem
//                   key={index}
//                   value={opt}
//                   onChange={(value) =>
//                     updateOption(question.id, index, value)
//                   }
//                   onRemove={() => removeOption(question.id, index)}
//                 />
//               ))}

//               <button onClick={() => addOption(question.id)}>
//                 Add Option
//               </button>
//             </div>
//           )}

//           <br />

//           <button onClick={() => removeQuestion(question.id)}>
//             Delete Question
//           </button>
//         </div>
//       ))}

//       <hr />

//       <button onClick={handleSave}>Save Form</button>
//     </div>
//   );
// };

// export default FormBuilderPage;












// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// import { useFormBuilder } from "../hooks/useForm";
// import { QuestionType } from "../types/form.types";

// const questionTypes: { value: QuestionType; label: string }[] = [
//   { value: "TEXT", label: "Text answer" },
//   { value: "MULTIPLE_CHOICE", label: "Single choice" },
//   { value: "CHECKBOX", label: "Multiple choice" },
//   { value: "DATE", label: "Date" },
// ];

// const FormBuilderPage: React.FC = () => {
//   const navigate = useNavigate();
//   const {
//     questions,
//     addQuestion,
//     updateQuestion,
//     removeQuestion,
//     addOption,
//     updateOption,
//     removeOption,
//   } = useFormBuilder();

//   const [formTitle, setFormTitle] = React.useState("");

//   const handleSaveForm = () => {
//     console.log("Saving form:", { title: formTitle, questions });
//     navigate("/");
//   };

//   return (
//     <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
//       <Typography variant="h4" mb={3}>
//         Form Builder
//       </Typography>

//       <TextField
//         fullWidth
//         label="Form title"
//         value={formTitle}
//         onChange={(e) => setFormTitle(e.target.value)}
//         sx={{ mb: 3 }}
//       />

//       {questions.map((q, index) => (
//         <Paper
//           key={q.id}
//           sx={{
//             p: 2,
//             mb: 2,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           <Box display="flex" gap={2}>
//             <TextField
//               fullWidth
//               label={`Question ${index + 1}`}
//               value={q.title}
//               onChange={(e) => updateQuestion(q.id, { title: e.target.value })}
//             />

//             <TextField
//               select
//               label="Type"
//               value={q.type}
//               onChange={(e) =>
//                 updateQuestion(q.id, { type: e.target.value as QuestionType })
//               }
//               sx={{ width: 180 }}
//             >
//               {questionTypes.map((type) => (
//                 <MenuItem key={type.value} value={type.value}>
//                   {type.label}
//                 </MenuItem>
//               ))}
//             </TextField>

//             <IconButton onClick={() => removeQuestion(q.id)}>
//               <DeleteIcon />
//             </IconButton>
//           </Box>

//           {(q.type === "MULTIPLE_CHOICE" || q.type === "CHECKBOX") && (
//             <Box>
//               <Typography variant="body2" mb={1}>
//                 Options
//               </Typography>

//               {q.options?.map((opt, i) => (
//                 <Box key={i} display="flex" gap={1} mb={1}>
//                   <TextField
//                     fullWidth
//                     value={opt}
//                     onChange={(e) => updateOption(q.id, i, e.target.value)}
//                   />
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => removeOption(q.id, i)}
//                   >
//                     Delete
//                   </Button>
//                 </Box>
//               ))}

//               <Button
//                 size="small"
//                 variant="outlined"
//                 onClick={() => addOption(q.id)}
//               >
//                 Add option
//               </Button>
//             </Box>
//           )}
//         </Paper>
//       ))}

//       <Box display="flex" gap={1} mb={3}>
//         {questionTypes.map((type) => (
//           <Button
//             key={type.value}
//             variant="outlined"
//             startIcon={<AddIcon />}
//             onClick={() => addQuestion(type.value)}
//           >
//             Add {type.label}
//           </Button>
//         ))}
//       </Box>

//       <Box display="flex" gap={2}>
//         <Button variant="contained" onClick={handleSaveForm}>
//           Save Form
//         </Button>
//         <Button variant="outlined" onClick={() => navigate("/")}>
//           Cancel
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default FormBuilderPage;
// FormBuilderPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useFormBuilder } from "../hooks/useForm";
import { QuestionType } from "../types/form.types";

const questionTypes: { value: QuestionType; label: string }[] = [
  { value: "TEXT", label: "Text answer" },
  { value: "MULTIPLE_CHOICE", label: "Single choice" },
  { value: "CHECKBOX", label: "Multiple choice" },
  { value: "DATE", label: "Date" },
];

const FormBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    questions,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addOption,
    updateOption,
    removeOption,
  } = useFormBuilder();

  const [formTitle, setFormTitle] = React.useState("");

  const handleSaveForm = () => {
    console.log("Saving form:", { title: formTitle, questions });
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
      <Typography variant="h4" mb={3}>
        Form Builder
      </Typography>

      <TextField
        fullWidth
        label="Form title"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        sx={{ mb: 3 }}
      />

      {questions.map((q, index) => (
        <Paper
          key={q.id}
          sx={{
            p: 2,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label={`Question ${index + 1}`}
              value={q.title}
              onChange={(e) => updateQuestion(q.id, { title: e.target.value })}
            />

            <TextField
              select
              label="Type"
              value={q.type}
              onChange={(e) =>
                updateQuestion(q.id, { type: e.target.value as QuestionType })
              }
              sx={{ width: 180 }}
            >
              {questionTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </TextField>

            <IconButton onClick={() => removeQuestion(q.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>

          {(q.type === "MULTIPLE_CHOICE" || q.type === "CHECKBOX") && (
            <Box>
              <Typography variant="body2" mb={1}>
                Options
              </Typography>

              {q.options?.map((opt, i) => (
                <Box key={i} display="flex" gap={1} mb={1}>
                  <TextField
                    fullWidth
                    value={opt}
                    onChange={(e) => updateOption(q.id, i, e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeOption(q.id, i)}
                  >
                    Delete
                  </Button>
                </Box>
              ))}

              <Button size="small" variant="outlined" onClick={() => addOption(q.id)}>
                Add option
              </Button>
            </Box>
          )}
        </Paper>
      ))}

      <Box display="flex" gap={1} mb={3}>
        {questionTypes.map((type) => (
          <Button
            key={type.value}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => addQuestion(type.value)}
          >
            Add {type.label}
          </Button>
        ))}
      </Box>

      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={handleSaveForm}>
          Save Form
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default FormBuilderPage;