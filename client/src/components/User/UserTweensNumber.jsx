import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserTweetsNumber() {
  const tweetsCounter = useSelector((state) => state.user.user.countUserTweets);
  return (
    <Typography
      sx={{
        color: "rgb(139, 152, 165)",
      }}
    >
      {tweetsCounter} tweets
    </Typography>
  );
}
