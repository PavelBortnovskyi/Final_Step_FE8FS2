import { useSelector } from "react-redux";
import { UserAvatarBG } from "./UserAvatarBG";
import { UserAvatarFoto } from "./UserAvatarFoto";

export function UserPageAvatar() {
  const userAvatar = "w";
  // useSelector((state) => state.user.user.avatarImgUrl);
  return (
    (userAvatar && <UserAvatarFoto userAvatar={userAvatar} />) || (
      <UserAvatarBG />
    )
  );
}
