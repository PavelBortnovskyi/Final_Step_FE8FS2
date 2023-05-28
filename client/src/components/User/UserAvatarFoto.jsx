import { Box } from "@mui/material";

export function UserAvatarFoto({ userAvatar }) {
  return (
    <Box
      sx={{
        fontSize: "76px",
        marginTop: "-70px",
        boxShadow: "0px 0px 0px 5px #15202b",
        marginLeft: "15px",
        borderRadius: "9999px",
      }}
    >
      <img
        src={userAvatar}
        alt="user avatar"
        style={{ width: "134px", height: "134px", borderRadius: "9999px" }}
      />
    </Box>
  );
}
