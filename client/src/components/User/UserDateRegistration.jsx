import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Box, Typography } from "@mui/material";

export function UserDateRegistration({ createdAt }) {
  const date = createdAt;
  let month;
  let year;
  if (date) {
    const dataRegistration = new Date(date);
    month = dataRegistration.toLocaleString("default", { month: "long" });
    year = dataRegistration.getFullYear();
  }

  return (
    date && (
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
    )
  );
}
