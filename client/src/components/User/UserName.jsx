import { Typography } from "@mui/material";

export function UserName({ fullName }) {
  return fullName && <Typography variant="h4">{fullName}</Typography>;
}
