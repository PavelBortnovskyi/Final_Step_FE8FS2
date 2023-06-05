import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserNick() {
  const userTag = useSelector((state) => state.user.user) || '';
  console.log(userTag.userTag);
  return (
    userTag.userTag && (
      <Typography sx={{ color: "rgb(139, 152, 165)" }}>
        {userTag.userTag}
      </Typography>
    )
  );
}
