import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { compareDesc } from "date-fns";

import { Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";

import { IActivityResponse } from "../core/_types/activityResponse";
import { IAppState } from "../core";
import { IEventResponse } from "../core/_types/eventResponse";
import { fetchActivityById } from "../core/activity/actions";
import { deleteSingleEvent } from "../core/event/actions";
import DateComponent from "./date-component";

interface RemoveEventProps {
  activity: IActivityResponse;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const RemoveEvent: React.FC<RemoveEventProps> = ({ activity }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = (e: any) => {
    dispatch(deleteSingleEvent(e.currentTarget.value));
    dispatch(fetchActivityById(activity.id));
  };

  const sortedEvents = useSelector<IAppState, IEventResponse[]>(({ event }) => 
    Object.values(event.list)
      .filter((evt) => activity.eventIds.includes(evt.id))
      .sort((a,b) => compareDesc(a.start, b.start))
  ); 

  return (
    <div className={classes.root}>
      <List>
        {sortedEvents.map((event) => (
          <ListItem key={event.id}>
            <ListItemText>
              <DateComponent date={event.start} />
            </ListItemText>
            <ListItemSecondaryAction>
              <Button value={event.id} onClick={handleDelete}>
                <DeleteIcon />
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RemoveEvent;
