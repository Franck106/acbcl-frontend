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
        <Grid item xs={12} sm={3} >
          <Grid item xs={12}>
            <img
              src="/images/new-logo.png"
              alt="logo"
              className={classes.image}
            />
          </Grid>
          <Grid item xs={12}>
            <p>Association Culturelle Buers et Croix Luizet ASSOCIATION LOI DE 1901</p>
            <p>35 Rue du 8 Mai 1945 69100 Villeurbanne</p>
          </Grid>
        </Grid>
        <Grid item xs={4} sm={3}>
          <Typography>ACBCL</Typography>
          <p>Devenez benevoles</p>
          <p>Partenariat</p>
          <p>Qui sommes-nous</p>
          <p>Faire un don</p>
        </Grid>
        <Grid item xs={4} sm={3}>
        <Typography>Liens</Typography>
        <p>Formations</p>
        <p>Conférences</p>
        <p>Activités</p>
        <p>Accompagnement à la scolarité</p>
        </Grid>
        <Grid item xs={4} sm={3}>
        <Typography>Contact</Typography>
        <p>contact@acbcl.fr</p>
        <p>Tél : 04 72 82 91 66</p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppFooter;
