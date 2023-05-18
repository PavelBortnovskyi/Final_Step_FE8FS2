import Button from "@mui/material/Button";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "@mui/material";

export function ButtonEditProfile() {
  const location = useLocation();
  return (
    <Button
      variant="plain"
      sx={{
        border: "1px solid",
        textTransform: "none",
        width: "106px",
        height: "34px",
        padding: "0 15px",
        borderRadius: "9999px",
        "&:hover": {
          backgroundColor: "#b3b3b32b",
        },
      }}
    >
      <Link
        component={NavLink}
        to="/settings/profile"
        state={{ background: location }}
        color="inherit"
        underline="none"
      >
        Edit profile
      </Link>
    </Button>
  );
}
