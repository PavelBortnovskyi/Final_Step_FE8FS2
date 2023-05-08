import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { UserName } from "./UserName";
import { UserTweetsNumber } from "./UserTweensNumber";
import { Box } from "@mui/material";

export function UserHeder() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "8px",
      }}
    >
      <ArrowBackOutlinedIcon
        sx={{
          fill: "rgb(139, 152, 165)",
          padding: "12px",
          borderRadius: "50%",
          boxSizing: "content-box",
          "&:hover": {
            backgroundColor: "#b3b3b32b",
          },
        }}
      />
      <Box>
        <UserName />
        <UserTweetsNumber />
      </Box>
    </Box>
  );
}
