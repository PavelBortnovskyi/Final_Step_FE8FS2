import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import style from "src/styles/User.module.scss";

export function UserDateRegistration() {
  return (
    <div>
      <p className={style.dateRegistation}>
        <CalendarMonthOutlinedIcon
          sx={{
            fill: "rgb(139, 152, 165)",
            height: "13px",
            width: "13px",
            marginRight: "8px",
          }}
        />
        date registration
      </p>
    </div>
  );
}
