import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserName() {
  const name = useSelector((state) => state.user.user);
  return name && <Typography variant="h4">{name.fullName}</Typography>;
}
