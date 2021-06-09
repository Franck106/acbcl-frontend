import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { useAttendees } from "../core/hooks/attendees-hook";
import { fetchAllUsers } from "../core/user/actions";
import { IActivityResponse } from "../core/_types/activityResponse";
import AttendeeList from "./attendee-list";

interface ActivityListItemProps {
  activity: IActivityResponse;
}

const useStyles = makeStyles((theme: Theme) => ({
  big: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(3),
  },
}));

const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
    // eslint-disable-next-line
  }, []);

  const attendeeList = useAttendees(activity);
  return (
    <>
      <ListItemAvatar>
        <Avatar
          alt="photo"
          src={"/" + activity.photos[0].url}
          className={classes.big}
        />
      </ListItemAvatar>
      <ListItemText primary={activity.name} secondary={activity.place} />
      <ListItemText primary={activity.price + "€"} />
      <AttendeeList attendees={attendeeList} />
    </>
  );
};

export default ActivityListItem;
