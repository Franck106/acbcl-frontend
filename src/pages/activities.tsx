import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchActivities } from "../core/activity/actions";
import { IActivityResponse } from "../core/_types/activityResponse";
import { IAppState } from "../core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ActivityItem from "../components/activity-item";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ActivitiesPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActivities());
    // eslint-disable-next-line
  }, []);

  const activities = useSelector<IAppState, IActivityResponse[]>(
    ({ activity }) => Object.values(activity.list)
  );
  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Activités
      </Typography>
      {activities && (
        <Grid container spacing={5} alignItems="flex-end">
          {activities.map((act) => (
            <Grid item key={act.id} xs={12} sm={6} md={4}>
              <ActivityItem activity={act} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ActivitiesPage;
