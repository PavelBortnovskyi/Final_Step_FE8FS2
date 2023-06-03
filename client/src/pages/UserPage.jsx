import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { User } from "src/components/User/User";

export const UserPage = () => {
  const user = useSelector((state) => state.user.user) || "";
  return (
    <Box
      sx={{
        display: "flex",
        // display: { xs: 'flex', md: 'block'}, приклад брейкпоінтів
        // gap-5 flex-col flex-auto
        direction: "column",
      }}
    >
      <User
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
    // </div>
  );
};
