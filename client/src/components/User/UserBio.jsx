import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserBio() {
  const userBio = "bio";
  // useSelector((state) => state.user.user.bio);
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
