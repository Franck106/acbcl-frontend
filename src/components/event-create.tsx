import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";

import { createEvent } from "../core/activity/actions";
import { IEventRequest } from "../core/_types/eventRequest";
import { IActivityResponse } from "../core/_types/activityResponse";

interface EventCreateFormProps {
  activity: IActivityResponse;
  onFinish: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
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

const EventCreateForm: React.FC<EventCreateFormProps> = ({
  activity,
  onFinish,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { handleSubmit, setValue } = useForm<IEventRequest>();

  const onSubmit = handleSubmit((data) => {
    data.activity = activity;
    console.log(data);
    dispatch(createEvent(data));
    onFinish();
  });

  const [selectedStartDate, setSelectedStartDate] =
    React.useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] =
    React.useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    const defaultDate = date ? date : new Date();
    setValue("start", defaultDate, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    const defaultDate = date ? date : new Date();
    setValue("end", defaultDate, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setSelectedEndDate(date);
  };

  return (
    <div className={classes.paper}>
      <form onSubmit={onSubmit} className={classes.form} noValidate>
        <Grid container spacing={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={6} md={6} className={classes.picker}>
              <KeyboardDatePicker
                variant="dialog"
                format="dd/MM/yyyy"
                margin="normal"
                id="startDate"
                label="Date de début"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={6} md={6} className={classes.picker}>
              <KeyboardTimePicker
                margin="normal"
                id="startDateTime"
                label="Heure de début"
                ampm={false}
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
            <Grid item xs={6} md={6} className={classes.picker}>
              <KeyboardDatePicker
                variant="dialog"
                format="dd/MM/yyyy"
                margin="normal"
                id="endDate"
                label="Date de fin"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={6} md={6} className={classes.picker}>
              <KeyboardTimePicker
                margin="normal"
                id="endDateTime"
                ampm={false}
                label="Heure de fin"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          VALIDER
        </Button>
      </form>
    </div>
  );
};

export default EventCreateForm;
