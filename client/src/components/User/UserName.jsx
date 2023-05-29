import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserName() {
  const fullName = "name";
  // useSelector((state) => state.user.user.fullName);
  return <Typography variant="h4">{fullName}</Typography>;
}
