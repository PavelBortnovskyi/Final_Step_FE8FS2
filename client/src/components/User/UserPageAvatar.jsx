import { useSelector } from "react-redux";
import { UserAvatarBG } from "./UserAvatarBG";
import { Avatar } from "@mui/material";

export function UserPageAvatar({ w, h, mt }) {
  const userAvatar = useSelector((state) => state.user.user);
  return (
    (userAvatar && (
      <Avatar
        alt="Remy Sharp"
        src={userAvatar.avatarImgUrl}
        sx={{
          overflow: "hidden",
          width: `${w}px`,
          height: `${h}px`,
          marginTop: `${mt}px`,
          boxShadow: "0px 0px 0px 5px #15202b",
          marginLeft: "15px",
        }}
      />
    )) || <UserAvatarBG w={w} h={h} mt={mt} />
  );
}
