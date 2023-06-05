import { NavLink, useLocation } from "react-router-dom";
import { Link } from "@mui/material";

export const LinkToEditProfile = () => {
  const location = useLocation();
  return (
    <Link
      component={NavLink}
      to="/settings/profile"
      state={{ background: location }}
      color="inherit"
      underline="none"
    >
      Edit profile
    </Link>
  );
};
