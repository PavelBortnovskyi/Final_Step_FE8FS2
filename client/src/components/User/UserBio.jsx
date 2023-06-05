import { Typography } from "@mui/material";

export function UserBio({ userBio }) {
  return (
    userBio && (
      <Typography
        sx={{
          padding: "14px 0 0",
        }}
      >
        {userBio}
      </Typography>
    )
  );
}
