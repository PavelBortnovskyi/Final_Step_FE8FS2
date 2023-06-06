import { Box } from "@mui/material";

import { UserHeder } from "../User/UserHeder";
import { FollowersList } from "./FpllowersList";

export const Followers = ({ follow }) => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ borderBottom: "1px solid #38444d" }}>
        <UserHeder fullName="Name" />
      </Box>
      <FollowersList follow={follow} />
    </Box>
  );
};
