import React from "react";
import "date-fns";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { IActivityCreate } from "../core/_types/activityCreate";
import { createActivity } from "../core/activity/actions";
import MenuItem from "@material-ui/core/MenuItem";

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

const ActivityCreateForm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { handleSubmit, control, reset } = useForm<IActivityCreate>();

  const onSubmit = handleSubmit((data) => {
    data.photos = [];
    const photo = {
      url: url,
    };
    data.photos.push(photo);
    dispatch(createActivity(data));
    reset({});
  });

  const defaultPhotos = [
    { url: "images/kid-play.png" },
    { url: "images/kids-draw.png" },
  ];
  const [url, seturl] = React.useState("images/kid-play.png");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    seturl(event.target.value);
  };

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
                  label="Nom de l'activité"
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
                  label="Lieu de l'activité"
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
              onChange={handleChange}
              helperText="Sélectioner une url"
            >
              {defaultPhotos.map((option) => (
                <MenuItem key={option.url} value={option.url}>
                  {option.url}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
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

export default ActivityCreateForm;
