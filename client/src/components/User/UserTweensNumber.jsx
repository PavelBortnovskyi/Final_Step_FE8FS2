import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserTweetsNumber() {
  const tweetsCounter = useSelector((state) => state.user.user);
  return (
    tweetsCounter && (
      <Typography
        sx={{
          color: "rgb(139, 152, 165)",
        }}
      >
        {tweetsCounter.countUserTweets} tweets
      </Typography>
    )
  );
}
