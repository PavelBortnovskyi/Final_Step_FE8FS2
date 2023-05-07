import { Box } from "@mui/material";
import { EditProfileModal } from "../EditProfile/EditProfileModal";
import { UserAction } from "./UserAction";
import { UserHeder } from "./UserHeder";
import { UserInfo } from "./UserInfo";

export const User = () => {
  return (
    <Box>
      <UserHeder />
      <UserInfo />
      <UserAction />
      <EditProfileModal />
    </Box>
  );
};
