import { UserPageFoto } from "./UserPageFoto";

import { Box } from "@mui/material";

import { UserInformationBlock } from "./UserInformationBlock";

export function UserInfo({
  userButton,
  lincToFollowers,
  lincToFollowings,
  hederImg,
  userAvatar,
  fullName,
  userTag,
  userBio,
  userLocation,
  createdAt,
  countUserFollowings,
  countUserFollowers,
}) {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <UserPageFoto hederImg={hederImg} />
      <Box
        sx={{
          padding: "11px 15px",
        }}
      >
        <UserInformationBlock
          userButton={userButton}
          lincToFollowers={lincToFollowers}
          lincToFollowings={lincToFollowings}
          w={"140"}
          h={"140"}
          mt={"-70"}
          userAvatar={userAvatar}
          fullName={fullName}
          userTag={userTag}
          userBio={userBio}
          userLocation={userLocation}
          createdAt={createdAt}
          countUserFollowings={countUserFollowings}
          countUserFollowers={countUserFollowers}
        />
      </Box>
    </Box>
  );
}
