import style from "src/styles/User.module.scss";
import { UserPageFoto } from "./UserPageFoto";
import { UserPageAvatar } from "./UserPageAvatar";
import { ButtonEditProfile } from "./ButtonEditProfile";
import { UserName } from "./UserName";
import { UserDateRegistration } from "./UserDateRegistration";
import { UserFolower } from "./UserFolower";
import { UserNick } from "./UserNIck";

export function UserInfo() {
  return (
    <div className={style.imgBlock}>
      <UserPageFoto />
      <div className={style.userBlock}>
        <div className={style.userIcoBlock}>
          <UserPageAvatar />
          <ButtonEditProfile />
        </div>
        <div className={style.nameBlock}>
          <UserName />
          <UserNick />
        </div>
        <UserDateRegistration />
        <UserFolower />
      </div>
    </div>
  );
}
