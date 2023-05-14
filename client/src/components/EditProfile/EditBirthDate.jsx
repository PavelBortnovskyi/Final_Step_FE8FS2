import { Button } from "@mui/material";
import { useState } from "react";

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
      {editBirthDate && <input name="birthDate" type="date" />}
    </>
  );
}
