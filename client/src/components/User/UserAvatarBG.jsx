import Avatar from "@mui/material/Avatar";

export function UserAvatarBG({ w, h, mt }) {
  return (
    <Avatar
      color="neutral"
      variant="outlined"
      sx={{
        overflow: "hidden",
        background: "rgb(87 75 179)",
        width: `${w}px`,
        height: `${h}px`,
        marginTop: `${mt}px`,

        fontSize: "76px",
        boxShadow: "0px 0px 0px 5px #15202b",
        marginLeft: "15px",
      }}
    ></Avatar>
  );
}
