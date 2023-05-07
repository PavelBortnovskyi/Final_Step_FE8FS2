import { Button } from "@mui/material";

export function EditBirthDate() {
  return (
    <Button variant="conteined" component="label">
      Edit
      <input name="birthDate" type="date" hidden />
    </Button>
  );
}
