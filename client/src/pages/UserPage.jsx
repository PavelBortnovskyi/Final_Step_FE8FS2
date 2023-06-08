import { Box } from "@mui/material";
// import { useSelector } from "react-redux";
import { LinkToEditProfile } from "src/components/User/LinkToEditProfile";
import { User } from "src/components/User/User";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getFollowers } from "src/redux/thunk/getFollowers";
import { getFollowings } from "src/redux/thunk/getFollowings";

export const UserPage = () => {
  const profile = "profile";
  const user = useSelector((state) => state.user.user) || "";
  const dispatch = useDispatch();
  const lincToFollowings = "/profile/followings";
  const lincToFollowers = "/profile/followers";
  const editProfile = <LinkToEditProfile />;

  // useEffect(() => {
  //   // if (following.length === 0) {
  //   dispatch(getFollowings(profile));
  //   //   return;
  //   // }
  // }, [dispatch]);

  // useEffect(() => {
  //   // if (follower.length === 0) {
  //   dispatch(getFollowers(profile));
  //   // return;
  //   // }
  // }, [dispatch]);
  return (
    <Box
      sx={{
        display: "flex",

        direction: "column",
      }}
    >
      <User
        userButton={editProfile}
        lincToFollowers={lincToFollowers}
        lincToFollowings={lincToFollowings}
        fullName={user.fullName}
        tweetsCounter={user.countUserTweets}
        hederImg={user.headerImgUrl}
        userAvatar={user.avatarImgUrl}
        userTag={user.userTag}
        userBio={user.bio}
        userLocation={user.location}
        createdAt={user.createdAt}
        countUserFollowings={user.countUserFollowings}
        countUserFollowers={user.countUserFollowers}
      />
    </Box>
  );
};
