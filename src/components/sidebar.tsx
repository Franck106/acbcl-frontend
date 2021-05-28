import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import { Grid } from "@material-ui/core";

import { Routes } from "../core/_enum/Routes";
import AuthModal from "./auth-modal";
import { IAppState } from "../core";
import { IUserResponse } from "../core/_types/userResponse";
import UserMenu from "./user-menu";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
  },
  menuLink: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  image: {
    width: 256,
    height: 100,
  },
}));

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const user = useSelector<IAppState, IUserResponse | undefined>(
    ({ user }) => user.user
  );

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Link component={RouterLink} to={Routes.HOME}>
              <img
                src="/images/logo-370x147.png"
                alt="logo"
                className={classes.image}
              />
            </Link>
          </Grid>
          <Grid item xs={10}>
            <Link
              component={RouterLink}
              to={Routes.HOME}
              className={classes.menuLink}
            >
              ACCUEIL
            </Link>
            <Link
              component={RouterLink}
              to={Routes.SUBSCRIPTION}
              className={classes.menuLink}
            >
              INSCRIPTIONS
            </Link>
            <Link
              component={RouterLink}
              to={Routes.ACTIVITIES}
              className={classes.menuLink}
            >
              ACTIVITES
            </Link>
            <Link
              component={RouterLink}
              to={Routes.CALENDAR}
              className={classes.menuLink}
            >
              CALENDRIER
            </Link>
          </Grid>
          <Grid item xs={2}>
            {user ? <UserMenu user={user} /> : <AuthModal />}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Sidebar;
