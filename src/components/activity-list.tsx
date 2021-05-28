import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EventIcon from "@material-ui/icons/Event";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import { DialogTitle } from "@material-ui/core";

import { IActivityResponse } from "../core/_types/activityResponse";
import { deleteActivity } from "../core/activity/actions";
import EventCreateForm from "./event-create";
import { IAppState } from "../core";

interface ActivityListProps {
  activities: IActivityResponse[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = (e: any) => {
    console.log(e.currentTarget.value);
    dispatch(deleteActivity(e.currentTarget.value));
  };

  const [open, setOpen] = React.useState(false);
  const [activityId, setActivityId] = React.useState("");
  const selectedActivity = useSelector<IAppState, IActivityResponse>(
    ({ activity }) => activity.list[activityId]
  );

  const handleClickOpen = (e: any) => {
    setActivityId(e.currentTarget.value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <List>
        {activities.map((act) => (
          <ListItem key={act.id}>
            <ListItemAvatar>
              <IconButton value={act.id} onClick={handleClickOpen}>
                <EventIcon />
              </IconButton>
            </ListItemAvatar>
            <ListItemAvatar>
              <Avatar alt="photo" src={"/" + act.photos[0].url} />
            </ListItemAvatar>
            <ListItemText primary={act.name} secondary={act.place} />
            <ListItemText primary={act.price + "€"} />
            <ListItemSecondaryAction>
              <Button value={act.id} onClick={handleDelete}>
                <DeleteIcon />
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {selectedActivity && (
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>
            Plannifier l'activité {selectedActivity.name}
          </DialogTitle>
          <EventCreateForm activity={selectedActivity} onFinish={handleClose} />
        </Dialog>
      )}
    </div>
  );
};

export default ActivityList;
