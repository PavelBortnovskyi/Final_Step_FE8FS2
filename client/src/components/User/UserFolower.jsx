import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserFolower() {
  const user = useSelector((state) => state.user.user);
  const countUserFollowers = useSelector((state) => state.user.user);
  const countUserFollowings = useSelector((state) => state.user.user);

  return (
    user && (
      <Box
        sx={{
          display: "flex",
          gap: "14px",
        }}
      >
        <Typography>
          {countUserFollowings.countUserFollowings}
          <span
            style={{
              color: "rgb(139, 152, 165)",
              marginLeft: "6px",
            }}
          >
            foloving
          </span>
        </Typography>
        <Typography>
          {countUserFollowers.countUserFollowers}
          <span
            style={{
              color: "rgb(139, 152, 165)",
              marginLeft: "6px",
            }}
          >
            folovers
          </span>
        </Typography>
      </Box>
    )
  );
}
