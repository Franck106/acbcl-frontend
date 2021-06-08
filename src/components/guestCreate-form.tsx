import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "react-hook-form";

import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { createGuest, fetchEvents } from "../core/event/actions";
import { IGuestCreate } from "../core/_types/guestCreate";
import { IEventResponse } from "../core/_types/eventResponse";

interface GuestCreateFormProps {
  event: IEventResponse;
  onFinish: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  picker: {
    color: theme.palette.text.primary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const GuestCreateForm: React.FC<GuestCreateFormProps> = ({
  event,
  onFinish,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents());
    setValue("eventId", event.id);
    // eslint-disable-next-line
  }, [dispatch]);

  const { handleSubmit, register, setValue } = useForm<IGuestCreate>();

  const onSubmit = handleSubmit((data) => {
    setValue("birthDate", selectedDate);
    dispatch(createGuest(data));
    onFinish();
  });

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const handleDateChange = (date: Date | null) => {
    const defaulDate = date ? date : new Date();
    setSelectedDate(defaulDate);
  };

  return (
    <div className={classes.paper}>
      <form onSubmit={onSubmit} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6} className={classes.picker}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              {...register("email")}
              autoComplete="email"
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
          ENVOYER
        </Button>
      </form>
    </div>
  );
};

export default GuestCreateForm;
