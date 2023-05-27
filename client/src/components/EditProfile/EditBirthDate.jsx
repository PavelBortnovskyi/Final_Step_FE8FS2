import { Button } from "@mui/material";
import { useState } from "react";
import { ErrorMessage, Field, Form } from "formik";
import { EditInput } from "./EditInput";

export function EditBirthDate() {
  const [editBirthDate, setEditBirthDate] = useState(false);
  const openInput = () => {
    setEditBirthDate(true);
  };
  return (
    <>
      <Button variant="conteined" onClick={openInput}>
        Edit
      </Button>
      {editBirthDate && (
        <Field
          name="birthDate"
          type="date"
          // label="location"
          component={EditInput}
        />
      )}
    </>
  );
}
