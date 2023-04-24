import { EditProfileModal } from "../EditProfile/EditProfileModal";
import { UserAction } from "./UserAction";
import { UserHeder } from "./UserHeder";
import { UserInfo } from "./UserInfo";

export const User = () => {
  return (
    <div>
      <UserHeder />
      <UserInfo />
      <UserAction />
      <EditProfileModal />
    </div>
  );
};
