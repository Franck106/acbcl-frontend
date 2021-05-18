import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";

import { Routes } from "../core/_enum/Routes";
import AuthModal from "./auth-modal";
import { IAppState } from "../core";
import { IUserResponse } from "../core/_types/userResponse";
import UserMenu from "./user-menu";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuLink: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  image: {
    width: 300,
    height: 100,
  },
}));

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const user = useSelector<IAppState, IUserResponse | undefined>(
    ({ user }) => user.user
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Link href={Routes.HOME}>
          <img src="/images/logo.png" alt="logo" className={classes.image} />
        </Link>
        <Toolbar>
          <Link href={Routes.HOME} className={classes.menuLink}>
            ACCUEIL
          </Link>
          <Link href={Routes.SUBSCRIPTION} className={classes.menuLink}>
            INSCRIPTIONS
          </Link>
          <Link href={Routes.ACTIVITIES} className={classes.menuLink}>
            ACTIVITES
          </Link>
          {user ? <UserMenu user={user} /> : <AuthModal />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Sidebar;
