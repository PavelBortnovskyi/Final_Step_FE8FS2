import Box from "@mui/material/Box";
import { UserActionButton } from "./UserActionButton";
import style from "src/styles/User.module.scss";

export function UserAction() {
  return (
    <div className={style.actions}>
      <Box
        sx={{
          "& button": {
            padding: "15px",
            width: "25%",
            borderRadius: "0",
            color: "rgb(139, 152, 165)",
            "&:hover": {
              backgroundColor: "#b3b3b32b",
            },
          },
        }}
      >
        <UserActionButton textButton="Tweets" />
        <UserActionButton textButton="Replise" />
        <UserActionButton textButton="Media" />
        <UserActionButton textButton="Likes" />
      </Box>
    </div>
  );
}
