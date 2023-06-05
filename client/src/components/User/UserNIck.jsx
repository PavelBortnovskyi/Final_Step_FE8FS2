import { Typography } from "@mui/material";

export function UserNick({ userTag }) {
  return (
    userTag && (
      <Typography sx={{ color: "rgb(139, 152, 165)" }}>{userTag}</Typography>
    )
  );
}
