import React, { useEffect } from "react";
import "date-fns";
import { add, isBefore, set } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";

import { IEventCreate } from "../core/_types/eventCreate";
import { IEventResponse } from "../core/_types/eventResponse";
import { createEvent } from "../core/event/actions";
import Checkbox from "@material-ui/core/Checkbox";

interface SingleEventAddFormProps {
  newEvent?: IEventCreate;
  eventEdit?: IEventResponse;
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

const SingleEventAddEditForm: React.FC<SingleEventAddFormProps> = ({
  newEvent,
  eventEdit,
  onFinish,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (newEvent) {
      setValue("start", newEvent.start);
      setValue("end", newEvent.end);
    }
    if (eventEdit) {
      setValue("title", eventEdit.title);
      setValue("start", eventEdit.start);
      setValue("end", eventEdit.end);
    }
    // eslint-disable-next-line
  }, [newEvent, eventEdit]);

  const { handleSubmit, setValue, control } =
    useForm<IEventCreate | IEventResponse>();

  const onSubmit = handleSubmit((data) => {
    data.title = data.title ? data.title : "(sans titre)";
    data.start = data.start ? data.start : defaultStartDateTime;
    data.end = data.end ? data.end : defaultEndDateTime;
    data.isAllDay = data.isAllDay ? data.isAllDay : false;
    dispatch(createEvent(data));
    onFinish();
  });

  const defaultStartDateTime = newEvent
    ? newEvent.start
    : set(new Date(), {
        hours: new Date().getHours() + 1,
        minutes: 0,
      });

  const defaultEndDateTime = newEvent
    ? newEvent.end
    : add(defaultStartDateTime, { hours: 1 });

  const [selectedStartDate, setSelectedStartDate] =
    React.useState<Date>(defaultStartDateTime);
  const [selectedEndDate, setSelectedEndDate] =
    React.useState<Date | null>(defaultEndDateTime);

  const handleStartDateChange = (date: Date | null) => {
    const selected = date ? date : defaultStartDateTime;
    const endTime = add(selected, { hours: 1 });
    setValue("start", selected, {
      shouldValidate: true,
    });
    setSelectedStartDate(selected);
    setValue("end", endTime, {
      shouldValidate: true,
    });
    setSelectedEndDate(endTime);
  };

  const handleStartTimeChange = (date: Date | null) => {
    const startTime = date ? date : defaultStartDateTime;
    const endTime = add(startTime, { hours: 1 });
    setValue("start", startTime, {
      shouldValidate: true,
    });
    setSelectedStartDate(startTime);
    setValue("end", endTime, {
      shouldValidate: true,
    });
    setSelectedEndDate(endTime);
  };

  const handleEndTimeChange = (date: Date | null) => {
    let endDate = date ? date : defaultEndDateTime;
    if (isBefore(endDate, selectedStartDate)) {
      endDate = add(selectedStartDate, { hours: 1 });
    }
    setValue("end", endDate, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setSelectedEndDate(endDate);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("isAllDay", event.target.checked);
  };

  return (
    <div className={classes.paper}>
      <form onSubmit={onSubmit} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Checkbox
              id="allDay"
              onChange={handleChange}
              name="allDay"
              color="primary"
            />
            <label htmlFor="allDay">Toute la journée</label>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Titre"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Description"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.picker}>
              <KeyboardDatePicker
                variant="dialog"
                format="dd/MM/yyyy"
                margin="normal"
                id="startDate"
                label="Date de début"
                defaultValue={defaultStartDateTime}
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.picker}>
              <KeyboardTimePicker
                margin="normal"
                id="startDateTime"
                label="Heure de début"
                ampm={false}
                defaultValue={defaultStartDateTime}
                value={selectedStartDate}
                onChange={handleStartTimeChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.picker}>
              <KeyboardTimePicker
                margin="normal"
                id="endDateTime"
                ampm={false}
                label="Heure de fin"
                value={selectedEndDate}
                defaultValue={defaultEndDateTime}
                onChange={handleEndTimeChange}
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
          Enregistrer
        </Button>
      </form>
    </div>
  );
};

export default SingleEventAddEditForm;
