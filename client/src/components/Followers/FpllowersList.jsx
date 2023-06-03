import { Box } from "@mui/material";

import { UserPageAvatar } from "../User/UserPageAvatar";
import { UserName } from "../User/UserName";
import { UserNick } from "../User/UserNIck";
import { UserBio } from "../User/UserBio";

export const FollowersList = ({ follow }) => {
  return follow.map((follower) => {
    return (
      <Box
        key={follower.id}
        sx={{
          display: "flex",
          gap: "24px",
        }}
      >
        <UserPageAvatar
          w={"50"}
          h={"50"}
          mt={"20"}
          userAvatar={follower.avatarImgUrl}
        />
        <Box>
          <UserName fullName={follower.userTag} />
          <UserNick userTag={follower.userTag} />
          <UserBio userBio={follower.bio} />
        </Box>
      </Box>
    );
  });
};
