import React from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { IUserResponse } from "../core/_types/userResponse";
import { userSignout } from "../core/user/actions";
import { Routes } from "../core";

interface UserMenuProps {
  user: IUserResponse;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(userSignout());
    return <Redirect to={Routes.HOME}/>
  };

  const userLabel = user.firstName.substring(0,1).toUpperCase();

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
      >
        <AccountCircle />
        {userLabel}
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          component={RouterLink}
          to={Routes.ADMIN_ACTIVITY}
        >
          Gérer les activités
        </MenuItem>
        <MenuItem onClick={handleClose}>Mon compte</MenuItem>
        <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
