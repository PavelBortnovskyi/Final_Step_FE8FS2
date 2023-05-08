import { SaveButton } from "./SaveButton";
import { Box, Typography } from "@mui/material";
export function EditFormHeder() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 12px",
      }}
    >
      <Box>x</Box>
      <Typography>Edit profile</Typography>
      <SaveButton />
    </Box>
  );
}
