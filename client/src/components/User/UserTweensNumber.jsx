import { Typography } from '@mui/material';

export function UserTweetsNumber({ tweetsCounter }) {
  const coutTweet = tweetsCounter || '0';
  return (
    coutTweet && (
      <Typography
        sx={{
          color: 'rgb(139, 152, 165)',
        }}
      >
        {coutTweet} tweets
      </Typography>
    )
  );
}
