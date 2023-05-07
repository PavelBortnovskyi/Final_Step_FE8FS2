import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Box, Typography } from "@mui/material";

export function UserDateRegistration() {
  return (
    <Box>
      <Typography
        sx={{
          color: "rgb(139, 152, 165)",
          padding: "14px 0",
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
        date registration
      </Typography>
    </Box>
  );
}
