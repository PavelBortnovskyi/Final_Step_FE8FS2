import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserName() {
  const fullName = useSelector((state) => state.auth.fullName);
  return <Typography variant="h4">{fullName}</Typography>;
}
