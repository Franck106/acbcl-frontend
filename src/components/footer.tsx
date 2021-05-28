import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 142,
    height: 100,
  },
}));

const AppFooter: React.FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Grid item xs={12}>
            <img
              src="/images/new-log.png"
              alt="logo"
              className={classes.image}
            />
          </Grid>
          <Grid item xs={12}>
            35 Rue du 8 Mai 1945 69100 Villeurbanne
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography>col2</Typography>
        </Grid>
        <Grid item xs={3}>
          col3
        </Grid>
        <Grid item xs={3}>
          col4
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppFooter;
