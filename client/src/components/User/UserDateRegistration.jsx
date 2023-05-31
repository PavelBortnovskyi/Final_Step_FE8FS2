import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export function UserDateRegistration() {
  const date = useSelector((state) => state.user.user);
  let month;
  let year;
  if (date) {
    const dataRegistration = new Date(date.createdAt);
    month = dataRegistration.toLocaleString("default", { month: "long" });
    year = dataRegistration.getFullYear();
  }

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
