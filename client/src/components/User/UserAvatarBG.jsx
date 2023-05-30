import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";

export function UserAvatarBG({w, h, mt}) {
  const userInitials = useSelector((state) => state.user.user.fullName);

  return (
    <Avatar
      color="neutral"
      variant="outlined"
      sx={{
        overflow: "hidden",
        background: "rgb(87 75 179)",
        width: `${w}px`,
        height: `${h}px`,
        marginTop: `${mt}px`,
        // width: "134px",
        // height: "134px",
        fontSize: "76px",
        // marginTop: "-70px",
        boxShadow: "0px 0px 0px 5px #15202b",
        marginLeft: "15px",
      }}
    >
      {userInitials}
    </Avatar>
  );
}
