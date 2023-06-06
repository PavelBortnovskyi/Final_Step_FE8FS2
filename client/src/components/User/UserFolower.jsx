import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function UserFolower({
  countUserFollowings,
  countUserFollowers,
  lincToFollowings,
  lincToFollowers,
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        gap: "14px",
      }}
    >
      <Link
        to={lincToFollowings}
        color="white"
        sx={{ color: "white" }}
        underline="none"
      >
        <Typography style={{ color: `${theme.palette.text.primary}` }}>
          {countUserFollowings}
          <span
            style={{
              color: "rgb(139, 152, 165)",
              marginLeft: "6px",
            }}
          >
            folowings
          </span>
        </Typography>
      </Link>

      <Link
        to={lincToFollowers}
        color="white"
        sx={{ color: "white" }}
        underline="none"
      >
        <Typography style={{ color: `${theme.palette.text.primary}` }}>
          {countUserFollowers}
          <span
            style={{
              color: "rgb(139, 152, 165)",
              marginLeft: "6px",
            }}
          >
            folowers
          </span>
        </Typography>
      </Link>
    </Box>
  );
}
