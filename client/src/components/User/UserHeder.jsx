import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { UserName } from "./UserName";
import { UserTweetsNumber } from "./UserTweensNumber";
import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export function UserHeder() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = async () => {
    !!location.state ? navigate(-1) : navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "8px",
      }}
    >
      <Button onClick={handleBack}>
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
      </Button>

      <Box>
        <UserName />
        <UserTweetsNumber />
      </Box>
    </Box>
  );
}
