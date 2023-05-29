import { SaveButton } from "./SaveButton";
import { Box, Typography } from "@mui/material";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export function EditFormHeder() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = async () => {
    // for transition close modal
    setIsOpen(false);
    await new Promise((resolve) => {
      setTimeout(resolve, 300);
    });

    // change back url
    !!location.state ? navigate(-1) : navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 12px",
      }}
    >
      <Box onClick={handleClose} sx={{ cursor: "pointer" }}>
        x
      </Box>
      <Typography>Edit profile</Typography>
      <SaveButton handleClose={handleClose} />
    </Box>
  );
}
