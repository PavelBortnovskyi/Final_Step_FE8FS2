import { Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useSelector } from "react-redux";

export function UserLocation() {
  const userLocation = useSelector((state) => state.user.user);
  return (
    userLocation && 
      <Typography sx={{ color: "rgb(139, 152, 165)" }}>
        <LocationOnOutlinedIcon
          sx={{
            fill: "rgb(139, 152, 165)",
            height: "16px",
            width: "16px",
          }}
        />
        {userLocation.location}
      </Typography>
    );
}
