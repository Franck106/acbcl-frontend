import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { fetchActivities } from "../core/activity/actions";
import { IActivityResponse } from "../core/_types/activityResponse";
import { IAppState } from "../core";
import ActivityCard from "../components/activity-card";
import { IEventResponse } from "../core/_types/eventResponse";
import { fetchEvents } from "../core/event/actions";
import EventCard from "../components/event-card";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHead: {
    marginTop: theme.spacing(3),
  },
}));

const HomePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActivities());
    dispatch(fetchEvents());
    // eslint-disable-next-line
  }, []);

  const activities = useSelector<IAppState, IActivityResponse[]>(
    ({ activity }) =>
      Object.values(activity.list).filter((act) => act.eventIds.length > 0)
  );

  const singleEvents = useSelector<IAppState, IEventResponse[]>(({ event }) =>
    Object.values(event.list).filter((evt) => evt.activityId === null)
  );

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Nos Activités Récurentes
      </Typography>
      {activities && (
        <Grid container spacing={5} alignItems="flex-end">
          {activities.map((act) => (
            <Grid item key={act.id} xs={12} sm={6} md={4}>
              <ActivityCard activity={act} />
            </Grid>
          ))}
        </Grid>
      )}
      {singleEvents.length > 0 && (
        <>
          <Typography variant="h4" className={classes.sectionHead} gutterBottom>
            Nos Evènements Ponctuels
          </Typography>
          <Grid container spacing={5} alignItems="flex-end">
            {singleEvents.map((evt) => (
              <Grid item key={evt.id} xs={12} sm={6} md={4}>
                <EventCard event={evt} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default HomePage;
