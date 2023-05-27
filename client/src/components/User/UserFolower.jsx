import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserFolower() {
  const countUserFollowers = useSelector(
    (state) => state.auth.countUserFollowers
  );
  const countUserFollowings = useSelector(
    (state) => state.auth.countUserFollowings
  );

  return (
    <Box
      sx={{
        display: "flex",
        gap: "14px",
      }}
    >
      <Typography>
        {countUserFollowings}
        <span
          style={{
            color: "rgb(139, 152, 165)",
          }}
        >
          foloving
        </span>
      </Typography>
      <Typography>
        {countUserFollowers}
        <span
          style={{
            color: "rgb(139, 152, 165)",
          }}
        >
          folovers
        </span>
      </Typography>
    </Box>
  );
}
