import React, { useEffect, useState } from "react";
import "date-fns";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { IActivityCreate } from "../core/_types/activityCreate";
import { createActivity, updateActivity } from "../core/activity/actions";
import MenuItem from "@material-ui/core/MenuItem";
import { IActivityResponse } from "../core/_types/activityResponse";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import { KeyboardDatePicker } from "@material-ui/pickers/DatePicker";
import DateFnsUtils from "@date-io/date-fns";
import { isBefore } from "date-fns";

interface ActivityCreateFormProps {
  activity?: IActivityResponse;
  onFinish?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(1),
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

const ActivityAddEditForm: React.FC<ActivityCreateFormProps> = ({
  activity,
  onFinish,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { handleSubmit, control, reset, setValue } =
    useForm<IActivityCreate | IActivityResponse>();
  const [url, setUrl] = React.useState("images/kid-play.png");

  const defaultDate = new Date();
  
  useEffect(() => {
    if (activity) {
      setValue("name", activity.name);
      setValue("description", activity.description);
      setValue("place", activity.place);
      setValue("price", activity.price);
      setValue("rangeStart", activity.rangeStart);
      setValue("rangeEnd", activity.rangeEnd)
      setUrl(activity.photos[0].url);
    } else {
      setValue("rangeStart", defaultDate);
      setValue("rangeEnd", defaultDate);
    }
    // eslint-disable-next-line
  }, [activity]);

  const onSubmit = handleSubmit((data) => {
    data.photos = [];
    const photo = {
      url: url,
    };
    data.photos.push(photo);
    if (activity) {
      const updatedActivity: IActivityResponse = {
        ...data,
        id: activity.id,
        eventIds: activity.eventIds,
        subscriptionIds: activity.subscriptionIds,
      };
      dispatch(updateActivity(updatedActivity));
      if (onFinish) {
        onFinish();
      }
    } else {
      dispatch(createActivity(data));
    }

    reset({});
  });

  const defaultPhotos = [
    { url: "images/kid-play.png" },
    { url: "images/kids-draw.png" },
  ];

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const [selectedStart, setSelectedStart] = useState<Date>(defaultDate);
  const [selectedEnd, setSelectedEnd] = useState<Date>(defaultDate);
  if (isBefore(selectedEnd, selectedStart)) {
    setSelectedEnd(selectedStart);
    setValue("rangeEnd", selectedEnd, {
      shouldValidate: true,
    });
  }
  const handleStartDateChange = (date: Date | null) => {
    const selected = date ? date : selectedStart;
    setSelectedStart(selected);
    setValue("rangeStart", selected, {
      shouldValidate: true,
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    const selected = date ? date : selectedEnd;
    setSelectedEnd(selected);
    setValue("rangeEnd", selected, {
      shouldValidate: true,
    });
  }

  return (
    <div className={classes.paper}>
      <form onSubmit={onSubmit} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  autoFocus
                  fullWidth
                  label="Nom"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  autoFocus
                  fullWidth
                  label="Description"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="place"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  autoFocus
                  fullWidth
                  label="Lieu"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  autoFocus
                  fullWidth
                  label="Prix"
                  type="number"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-select-url"
              select
              label="Photo"
              value={url}
              onChange={handlePhotoChange}
              helperText="Sélectioner une url"
            >
              {defaultPhotos.map((option) => (
                <MenuItem key={option.url} value={option.url}>
                  {option.url}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12} sm={4} className={classes.picker}>
              <KeyboardDatePicker
                variant="dialog"
                format="dd/MM/yyyy"
                margin="normal"
                id="start"
                label="Date de début"
                defaultValue={defaultDate}
                value={selectedStart}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.picker}>
              <KeyboardDatePicker
                variant="dialog"
                format="dd/MM/yyyy"
                margin="normal"
                id="end"
                label="Date de fin"
                defaultValue={defaultDate}
                value={selectedEnd}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
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

export default ActivityAddEditForm;
