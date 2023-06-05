import { Typography } from "@mui/material";

export function UserTweetsNumber({ tweetsCounter }) {
  return (
    tweetsCounter && (
      <Typography
        sx={{
          color: "rgb(139, 152, 165)",
        }}
      >
        {tweetsCounter} tweets
      </Typography>
    )
  );
}
