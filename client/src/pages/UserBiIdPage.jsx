import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonSubscribe } from "src/components/User/ButtonSubscribe";
import { User } from "src/components/User/User";
import { getUserBiId } from "src/redux/thunk/getUserBiId";
import { getFollowers } from "src/redux/thunk/getFollowers";
import { getFollowings } from "src/redux/thunk/getFollowings";
import { useParams } from "react-router-dom";

export const UserBiIdPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const user = useSelector((state) => state.userBiId.userId) || "";
  const subscribe = <ButtonSubscribe userId={user.id} />;
  console.log(user.id);
  const lincToFollowings = "/followings";
  const lincToFollowers = "/followers";

  const userId = user.id;

  useEffect(() => {
    // if (following.length === 0) {
    dispatch(getUserBiId(id));
    dispatch(getFollowings("profile"));
    // dispatch(getFollowers(id));
    //   return;
    // }
  }, [userId]);

  useEffect(() => {
    // if (follower.length === 0) {
    // dispatch(getFollowers(userId));
    // return;
    // }
  }, []);

  // useEffect(() => {
  //   if (user === "") {
  //     dispatch(getUserBiId("2"));
  //     return;
  //   }
  // }, [user, dispatch]);
  return (
    <Box
      sx={{
        display: "flex",

        direction: "column",
      }}
    >
      <User
        lincToFollowers={lincToFollowers}
        lincToFollowings={lincToFollowings}
        userButton={subscribe}
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
