import { useSelector } from "react-redux";
import { UserAvatarBG } from "./UserAvatarBG";
import { UserAvatarFoto } from "./UserAvatarFoto";

export function UserPageAvatar() {
  const userAvatar = useSelector((state) => state.auth.avatarImgUrl);
  return (
    (userAvatar && <UserAvatarFoto userAvatar={userAvatar} />) || (
      <UserAvatarBG />
    )
  );
}
