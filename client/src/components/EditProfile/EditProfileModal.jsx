import { EditFormShema } from "./EditFormShema";
import { Box, Dialog } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export function EditProfileModal() {
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
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{
          backgroundColor: "rgba(91, 112, 131, 0.4)",
        }}
      >
        <Box
          sx={{
            color: "white",
            backgroundColor: "rgba(21, 32, 43, 1)",
          }}
        >
          <EditFormShema />
        </Box>
      </Dialog>
    </>
  );
}
