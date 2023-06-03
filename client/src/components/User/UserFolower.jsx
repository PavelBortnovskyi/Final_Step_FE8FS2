import { Box, Typography } from "@mui/material";

export function UserFolower({ countUserFollowings, countUserFollowers }) {
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
            marginLeft: "6px",
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
            marginLeft: "6px",
          }}
        >
          folovers
        </span>
      </Typography>
    </Box>
  );
}
