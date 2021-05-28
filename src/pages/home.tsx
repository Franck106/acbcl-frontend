import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  description: {
    maxWidth: 500,
    textAlign: "justify",
  },
  section: {
    margin: theme.spacing(3, 2),
  },
  main: {
    marginTop: theme.spacing(2),
  },
  image: {
    margin: "auto",
    width: 300,
    height: 200,
  },
}));

const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Notre Actualité
      </Typography>
      <Container className={classes.description}>
        <Typography variant="body2" className={classes.section}>
          L’A.C.B.C.L. (Association Culturelle Buers et Croix Luizet) est une
          association qui existe depuis plus de 20 ans sur les quartiers des
          Buers et de Croix Luizet.
        </Typography>
        <Divider variant="middle" />
        <Typography variant="body2" className={classes.section}>
          Nous sommes une association de proximité qui luttons contre l’échec
          scolaire et pour la réussite des enfants dans leur scolarité.
        </Typography>
        <Divider />
        <Typography variant="body2" className={classes.section}>
          Accès : Derrière le bâtiment par la rampe accès handicapé ou par le
          Pimms Ouverture : Du lundi au jeudi de 17 h à 20 h
        </Typography>
      </Container>
      <Grid container spacing={2} alignItems="center" className={classes.main}>
        <Grid item xs={12} sm={6} alignItems="center">
          <img src="images/family.png" alt="logo" className={classes.image} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src="images/fashion.png" alt="logo" className={classes.image} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
