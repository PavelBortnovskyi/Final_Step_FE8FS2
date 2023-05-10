import { Box, Typography } from "@mui/material";

export function UserFolower() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "14px",
      }}
    >
      <Typography>
        0
        <span
          style={{
            color: "rgb(139, 152, 165)",
          }}
        >
          foloving
        </span>
      </Typography>
      <Typography>
        0
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
