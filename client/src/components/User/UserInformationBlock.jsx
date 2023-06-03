import { UserPageAvatar } from "./UserPageAvatar";
import { ButtonEditProfile } from "./ButtonEditProfile";
import { UserName } from "./UserName";
import { UserDateRegistration } from "./UserDateRegistration";
import { UserFolower } from "./UserFolower";
import { UserNick } from "./UserNIck";
import { Box } from "@mui/material";
import { UserBio } from "./UserBio";
import { UserLocation } from "./UserLocation";
export function UserInformationBlock({
  w,
  h,
  mt,
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
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <UserPageAvatar w={w} h={h} mt={mt} userAvatar={userAvatar} />
        <ButtonEditProfile />
      </Box>
      <Box sx={{ margin: "12px 0" }}>
        <UserName fullName={fullName} />
        <UserNick userTag={userTag} />
        <UserBio userBio={userBio} />
      </Box>
      <Box sx={{ display: "flex", gap: "8px" }}>
        <UserLocation userLocation={userLocation} />
        <UserDateRegistration createdAt={createdAt} />
      </Box>

      <UserFolower
        countUserFollowings={countUserFollowings}
        countUserFollowers={countUserFollowers}
      />
    </>
  );
}
