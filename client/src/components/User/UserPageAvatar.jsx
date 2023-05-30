import { useSelector } from "react-redux";
import { UserAvatarBG } from "./UserAvatarBG";
import { UserAvatarFoto } from "./UserAvatarFoto";
import { Avatar } from "@mui/material";

export function UserPageAvatar({w, h, mt}) {
  const userAvatar = "w";
  // useSelector((state) => state.user.user.avatarImgUrl);
  return (
    ( userAvatar && <Avatar alt="Remy Sharp" src={userAvatar}
      sx={{
        overflow: "hidden",
        width: `${w}px`,
        height: `${h}px`,
        marginTop: `${mt}px`,
        boxShadow: "0px 0px 0px 5px #15202b",
        marginLeft: "15px",
      }} />
      || <UserAvatarBG w={w} h={h} mt={mt}/>
    )
    // (userAvatar && <UserAvatarFoto userAvatar={userAvatar} />) || (
    //   <UserAvatarBG />
    // )
  );
}
