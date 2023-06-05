import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonSubscribe } from "src/components/User/ButtonSubscribe";
import { User } from "src/components/User/User";
import { getUserBiId } from "src/redux/thunk/getUserBiId";

export const UserBiIdPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userBiId.userId) || "";
  const subscribe = <ButtonSubscribe userId={user.id} />;
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
