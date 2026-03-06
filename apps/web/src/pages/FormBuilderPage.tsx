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

              <Button
                size="small"
                variant="outlined"
                onClick={() => addOption(q.id)}
              >
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
