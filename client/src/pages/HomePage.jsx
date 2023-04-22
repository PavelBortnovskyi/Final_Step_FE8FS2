import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import homeHeder from "src/styles/HomePageHeder.module.scss";
import { NavLink } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <div className={homeHeder.homeHeder}>
        <NavLink to="/" className={homeHeder.hed}>
          Home
        </NavLink>
        <div>
          <Box
            sx={{
              "& button": {
                padding: "15px",
                width: "50%",
                borderRadius: "0",
                color: "black",
                "&:hover": {
                  backgroundColor: "#b3b3b32b",
                },
              },
            }}
          >
            <Button size="medium">For you</Button>
            <Button size="medium">Folowing</Button>
          </Box>
        </div>
      </div>
      <div>тут будуть твіти</div>
    </>
  );
};
