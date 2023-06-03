import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Followers } from "src/components/Followers/Followers";
import { getFollowings } from "src/redux/thunk/getFollowings";

export const FollowingsPage = () => {
  const dispatch = useDispatch();
  const following = useSelector((state) => state.followings.followings) || [];
  useEffect(() => {
    if (following.length === 0) {
      dispatch(getFollowings());
      return;
    }
  }, [following.length, dispatch]);

  return (
    following.content && (
      <Box
        sx={{
          display: "flex",
          direction: "column",
        }}
      >
        <Followers follow={following.content} />
      </Box>
    )
  );
};
