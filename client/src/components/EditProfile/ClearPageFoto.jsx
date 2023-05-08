import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/material";

export function ClearPageFoto() {
  return (
    <Box
      sx={{
        borderRadius: "999px",
        background: "rgb(37 37 37 / 50%)",
        padding: "20px",
        cursor: "pointer",
        "&:hover": {
          background: "rgb(37 37 37 / 30%)",
        },
      }}
    >
      <ClearIcon />
    </Box>
  );
}
