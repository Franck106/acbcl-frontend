import React from "react";
import { Redirect } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { IUserCreate } from "../core/_types/userCreate";
import { postUser } from "../core/user/actions";
import { IAppState, Routes } from "../core";
import { IUserResponse } from "../core/_types/userResponse";

interface SignupFormProps {
  onChange: () => void;
  onFinish: () => void;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpForm: React.FC<SignupFormProps> = ({ onChange, onFinish }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector<IAppState, IUserResponse | undefined>(
    ({ user }) => user.user
  );

  const { handleSubmit, register, setValue } = useForm<IUserCreate>();
  const onSignup = handleSubmit((data) => {
    console.log(data);
    dispatch(postUser(data));
  });

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    const defaultDate = date ? date : new Date();
    setValue("birthDate", defaultDate, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setSelectedDate(date);
  };

  if (user) {
    onFinish();
    return <Redirect to={Routes.HOME} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Créer un compte
        </Typography>
        <form onSubmit={onSignup} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                {...register("firstName")}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Nom"
                {...register("lastName")}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant="dialog"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="birthDate"
                  label="Date de naissance"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Adresse"
                {...register("address")}
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="postCode"
                label="Code Postal"
                {...register("postCode")}
                autoComplete="pcode"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="Ville"
                {...register("city")}
                autoComplete="city"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                id="phone"
                label="N° de téléphone"
                {...register("phone")}
                autoComplete="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Adresse mail"
                {...register("email")}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                {...register("password")}
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enregistrer
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" onClick={onChange} variant="body2">
                Déjà un compte? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUpForm;
