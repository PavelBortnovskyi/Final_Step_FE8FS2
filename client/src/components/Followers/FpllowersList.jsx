import { Box } from "@mui/material";

import { UserPageAvatar } from "../User/UserPageAvatar";
import { UserName } from "../User/UserName";
import { UserNick } from "../User/UserNIck";
import { UserBio } from "../User/UserBio";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserBiId } from "src/redux/thunk/getUserBiId";

export const FollowersList = ({ follow }) => {
  // const { id } = useParams();
  const dispatch = useDispatch();
  return follow.map((follower) => {
    const follwId = follower.id;
    console.log(follwId);
    return (
      <Link
        key={follower.id}
        to={`/user/${follwId}`}
        onClick={() => {
          dispatch(getUserBiId(follwId));
        }}
      >
        <Box
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
            <UserName fullName={follower.fullName} />
            <UserNick userTag={follower.userTag} />
            <UserBio userBio={follower.bio} />
          </Box>
        </Box>
      </Link>
    );
  });
};
