import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowings } from "src/redux/thunk/getFollowings";
import { subscribeUser } from "src/redux/thunk/subscribeUser";
import { unsubscribeUser } from "src/redux/thunk/unsubscribeUser";

export const ButtonSubscribe = ({ userId }) => {
  const dispatch = useDispatch();

  const following = useSelector((state) => state.followings.followings);
  let compairUser;
  if (following.content) {
    compairUser = following.content.some((item) => item.id === userId);
  }
  useEffect(() => {
    if (following.content) {
      compairUser = following.content.some((item) => item.id === userId);
    }
  }, [compairUser]);

  useEffect(() => {
    dispatch(getFollowings());
  }, [dispatch]);

  const hendleClick = () => {
    if (!compairUser) {
      console.log("follow");
      console.log(compairUser);
      dispatch(subscribeUser(userId));
      dispatch(getFollowings());
    } else if (compairUser) {
      dispatch(unsubscribeUser(userId));
      dispatch(getFollowings());
      console.log("unfollow");
    }
  };

  return (
    (compairUser && (
      <Box onClick={hendleClick}>
        <Typography>Unfollow</Typography>
      </Box>
    )) ||
    (!compairUser && (
      <Box onClick={hendleClick}>
        <Typography>Follow</Typography>
      </Box>
    ))
  );
};
