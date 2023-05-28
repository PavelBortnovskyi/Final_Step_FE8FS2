import { Typography } from "@mui/material";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { useSelector } from "react-redux";

export function UserWebsite() {
  const userWebsite = useSelector((state) => state.auth.website);

  return (
    // userWebsite &&
    <Typography>
      <LinkOutlinedIcon
        sx={{
          fill: "rgb(139, 152, 165)",
          height: "16px",
          width: "16px",
          transform: "rotate(135deg)",
        }}
      />
      <a href={userWebsite}>{userWebsite}</a>
      додати це поле
    </Typography>
  );
}
