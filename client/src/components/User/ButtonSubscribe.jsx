import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFollowings } from "src/redux/thunk/getFollowings";
import { subscribeUser } from "src/redux/thunk/subscribeUser";
import { unsubscribeUser } from "src/redux/thunk/unsubscribeUser";

export const ButtonSubscribe = ({ userId }) => {
  const dispatch = useDispatch();

  let following = useSelector((state) => state.followings.followings);
  let compairUser;
  if (following.content) {
    compairUser = following.content.some((item) => item.id === userId);
  }
  console.log(compairUser);
  //////////////розібратися
  const hendleClick = () => {
    if (!compairUser) {
      dispatch(subscribeUser(userId));
      dispatch(getFollowings(userId));
    } else if (compairUser) {
      dispatch(unsubscribeUser(userId));
      dispatch(getFollowings(userId));
    }
    dispatch(getFollowings());
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
