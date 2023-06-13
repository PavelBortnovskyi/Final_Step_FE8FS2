import { Box } from "@mui/material";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Followers } from "src/components/Followers/Followers";
// import { getFollowers } from "src/redux/thunk/getFollowers";

export const FollowersPage = () => {
  // const dispatch = useDispatch();
  const follower = useSelector((state) => state.followers.followers) || [];

  // useEffect(() => {
  //   // if (follower.length === 0) {
  //   dispatch(getFollowers());
  //   // return;
  //   // }
  // }, [follower.length]);

  return (
    follower.content && (
      <Box
        sx={{
          display: "flex",
          direction: "column",
        }}
      >
        <Followers follow={follower.content} />
      </Box>
    )
  );
};
