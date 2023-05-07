import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Grid } from "@mui/material";

export const HomePage = () => {
  return (
    <Grid
      container
      spacing={2}
      columns={16}
      direction="column"
      // sx={{ border: "1px solid" }}
    >
      <Grid item xs={8}>
        <NavLink to="/">Home</NavLink>
      </Grid>
      <Grid item xs={8}>
        <Box
          sx={{
            "& button": {
              padding: "15px",
              width: "50%",
              borderRadius: "0",
              color: "rgb(255, 255, 255)",
              "&:hover": {
                backgroundColor: "#b3b3b32b",
              },
            },
          }}
        >
          <Button size="medium">For you</Button>
          <Button size="medium">Folowing</Button>
        </Box>
      </Grid>
    </Grid>
  );
};
