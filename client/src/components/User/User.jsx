import { Box } from "@mui/material";
import { UserAction } from "./UserAction";
import { UserHeder } from "./UserHeder";
import { UserInfo } from "./UserInfo";

export const User = ({
  fullName,
  tweetsCounter,
  hederImg,
  userAvatar,
  userTag,
  userBio,
  userLocation,
  createdAt,
  countUserFollowings,
  countUserFollowers,
}) => {
  return (
    <Box
      sx={{
        borderBottom: "1px solid #38444d",

        width: "100vw",
      }}
    >
      <UserHeder fullName={fullName} tweetsCounter={tweetsCounter} />
      <UserInfo
        hederImg={hederImg}
        userAvatar={userAvatar}
        fullName={fullName}
        userTag={userTag}
        userBio={userBio}
        userLocation={userLocation}
        createdAt={createdAt}
        countUserFollowings={countUserFollowings}
        countUserFollowers={countUserFollowers}
      />
      <UserAction />
    </Box>
  );
};
