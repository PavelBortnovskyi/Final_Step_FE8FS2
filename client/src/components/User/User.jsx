import { Box } from "@mui/material";
import { UserAction } from "./UserAction";
import { UserHeder } from "./UserHeder";
import { UserInfo } from "./UserInfo";

export const User = () => {
  return (
    <Box sx={{ border: "1px solid white", borderTop: "none" }}>
      <UserHeder />
      <UserInfo />
      <UserAction />
    </Box>
  );
};
