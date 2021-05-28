import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { ISubscriptionGuest } from "../core/_types/subscription-guest";
import {
  fetchActivities,
  sendSubscriptionGuest,
} from "../core/activity/actions";
import { IAppState } from "../core";
import { IActivityResponse } from "../core/_types/activityResponse";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
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

const ActivityGuestSubscribe: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActivities());
    // eslint-disable-next-line
  }, []);

  const activities = useSelector<IAppState, IActivityResponse[]>(
    ({ activity }) =>
      Object.values(activity.list).filter(
        (act) => act.events && act.events.length > 0
      )
  );

  const { handleSubmit, register, setValue } = useForm<ISubscriptionGuest>();

  const onSubmit = handleSubmit((data) => {
    dispatch(sendSubscriptionGuest(data));
  });

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    const defaultDate = date ? date : new Date();
    setValue("guest.birthDate", defaultDate, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setSelectedDate(date);
  };

  const [activityId, setActivityId] = React.useState("");
  const selectedActivity = activities.filter((act) => act.id === activityId)[0];
  const selectedActivityNextEvent =
    selectedActivity && selectedActivity.events
      ? format(new Date(selectedActivity.events[0].start), "dd/MM/yyyy HH:mm")
      : null;

  setValue("activity", selectedActivity, {
    shouldValidate: true,
    shouldDirty: true,
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setActivityId(event.target.value as string);
  };

  return (
    <div className={classes.paper}>
      <form onSubmit={onSubmit} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              autoComplete="fname"
              {...register("guest.firstName")}
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
              {...register("guest.lastName")}
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
              {...register("guest.address")}
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
              {...register("guest.postCode")}
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
              {...register("guest.city")}
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
              {...register("guest.phone")}
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
              {...register("guest.email")}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              value={activityId}
              onChange={handleChange}
              fullWidth
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                Sélectionner une activité
              </MenuItem>
              {activities.map((act) => (
                <MenuItem key={act.id} value={act.id}>
                  {act.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {selectedActivity && (
            <Grid item xs={6}>
              <TableContainer>
                <Table>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Prix :
                    </TableCell>
                    <TableCell>{selectedActivity.price}€</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Lieu :
                    </TableCell>
                    <TableCell>{selectedActivity.place}</TableCell>
                  </TableRow>
                  {selectedActivityNextEvent && (
                    <TableRow>
                      <TableCell>{selectedActivityNextEvent}</TableCell>
                    </TableRow>
                  )}
                </Table>
              </TableContainer>
            </Grid>
          )}
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

export default ActivityGuestSubscribe;
