import React from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import "date-fns";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { sendSubscriptionUser } from "../core/activity/actions";
import { IActivityResponse } from "../core/_types/activityResponse";
import { IUserResponse } from "../core/_types/userResponse";
import { ISubscriptionUser } from "../core/_types/subscription-user";

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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface ActivitySubscribeUserProps {
  user: IUserResponse;
  comingActivities: IActivityResponse[];
}

const ActivityUserSubscribe: React.FC<ActivitySubscribeUserProps> = ({
  user,
  comingActivities,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const subscription: ISubscriptionUser = {
      activity: selectedActivity,
      user: user,
    };
    console.log(subscription);
    dispatch(sendSubscriptionUser(subscription));
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setActivityId(event.target.value as string);
  };

  const [activityId, setActivityId] = React.useState("");
  const selectedActivity = comingActivities.filter(
    (act) => act.id === activityId
  )[0];
  const selectedActivityNextEvent =
    selectedActivity && selectedActivity.events
      ? format(new Date(selectedActivity.events[0].start), "dd/MM/yyyy HH:mm")
      : null;

  return (
    <div className={classes.paper}>
      <Grid container spacing={2}>
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
            {comingActivities.map((act) => (
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
        type="button"
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        VALIDER
      </Button>
    </div>
  );
};

export default ActivityUserSubscribe;
