import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoginForm from "./login-form";
import { clearError } from "../core/user/actions";
import SignUpForm from "./signup-form";

const AuthModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(clearError());
    setHasAccount(true);
    setOpen(false);
  };

  const switchForm = () => {
    setHasAccount((prev) => !prev);
  };

  const [hasAccount, setHasAccount] = useState(true);
  return (
    <div>
      <Button color="secondary" onClick={handleClickOpen}>
        CONNEXION
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Bienvenue</DialogTitle>
        <DialogContent>
          {hasAccount ? (
            <LoginForm onChange={switchForm} onFinish={handleClose}/>
          ) : (
            <SignUpForm onChange={switchForm} onFinish={handleClose}/>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AuthModal;
