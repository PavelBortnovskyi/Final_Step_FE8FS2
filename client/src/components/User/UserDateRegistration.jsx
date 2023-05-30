import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserDateRegistration() {
  // const date = useSelector((state) => state.user.user.createdAt);
  // const dataRegistration = new Date(date);
  const month = "12";
  // dataRegistration.toLocaleString("default", { month: "long" });
  const year = "12";
  // dataRegistration.getFullYear();

  return (
    <Box>
      <Typography
        sx={{
          color: "rgb(139, 152, 165)",
        }}
      >
        <CalendarMonthOutlinedIcon
          sx={{
            fill: "rgb(139, 152, 165)",
            height: "13px",
            width: "13px",
            marginRight: "8px",
          }}
        />
        Joined {month} {year}
      </Typography>
    </Box>
  );
}
