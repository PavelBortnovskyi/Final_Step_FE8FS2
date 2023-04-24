import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import style from "src/styles/User.module.scss";
import { UserName } from "./UserName";
import { UserTweetsNumber } from "./UserTweensNumber";

export function UserHeder() {
  return (
    <div className={style.userHeder}>
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
      <div>
        <UserName />
        <UserTweetsNumber />
      </div>
    </div>
  );
}
