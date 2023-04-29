import { Header } from "src/components/Header/Header";
import { Main } from "src/components/Main/Main";
import { Footer } from "src/components/Footer/Footer";
import { Grid } from "@mui/material";
export const Layout = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid item xs={3}>
        <Header />
      </Grid>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={8}>
            <Main />
          </Grid>
          <Grid item xs={4}>
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
