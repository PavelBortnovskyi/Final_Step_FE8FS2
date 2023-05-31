import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserNick() {
  const userTag = useSelector((state) => state.user.user);
  return (
    userTag && (
      <Typography sx={{ color: "rgb(139, 152, 165)" }}>
        {userTag.userTag}
      </Typography>
    )
  );
}
