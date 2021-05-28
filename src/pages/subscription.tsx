import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import ActivityGuestSubscribe from "../components/activity-guest-subscribe";
import { IAppState } from "../core";
import { IUserResponse } from "../core/_types/userResponse";
import ActivityUserSubscribe from "../components/activity-user-subscribe";
import { fetchActivities } from "../core/activity/actions";
import { IActivityResponse } from "../core/_types/activityResponse";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const SubscriptionPage: React.FC = () => {
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

  const user = useSelector<IAppState, IUserResponse | undefined>(
    ({ user }) => user.user
  );

  return (
    <Container className={classes.root}>
      <Typography variant="h4">Inscription Activité</Typography>
      {user ? (
        <ActivityUserSubscribe comingActivities={activities} user={user} />
      ) : (
        <ActivityGuestSubscribe />
      )}
    </Container>
  );
};

export default SubscriptionPage;
