import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EventIcon from "@material-ui/icons/Event";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import { IActivityResponse } from "../core/_types/activityResponse";
import { deleteActivity, fetchActivities } from "../core/activity/actions";
import ActivityAddEditForm from "./activity-addEditForm";
import { IAppState } from "../core";
import { fetchSubscriptions } from "../core/event/actions";
import ActivityListItem from "./activity-listItem";
import SubscriptionListButton from "./subscription-listButton";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  scheduled: {
    color: "#fff",
    backgroundColor: green[500],
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const ActivityList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchActivities());
    dispatch(fetchSubscriptions());
    // eslint-disable-next-line
  }, []);

  const activities = useSelector<IAppState, IActivityResponse[]>(
    ({ activity }) => Object.values(activity.list)
  );

  const hasEvents = (activity: IActivityResponse): boolean => {
    if (activity.eventIds.length > 0) {
      return true;
    }
    return false;
  };

  const handleDelete = (e: any) => {
    dispatch(deleteActivity(e.currentTarget.value));
  };

  const handleSchedule = (e: any) => {
    history.push("/admin/activity/" + e.currentTarget.value);
  };

  const [openEdit, setEditOpen] = useState(false);
  const [activityEdit, setActivityEdit] = useState<IActivityResponse>();

  const handleEdit = (e: any) => {
    setActivityEdit(
      activities.filter((act) => act.id === e.currentTarget.value)[0]
    );
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  return (
    <div className={classes.root}>
      <List>
        {activities.map((act) => (
          <ListItem key={act.id}>
            <ActivityListItem activity={act} />
            <SubscriptionListButton activity={act} />
            <ListItemAvatar>
              <IconButton value={act.id} onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </ListItemAvatar>
            <ListItemAvatar>
              <IconButton
                value={act.id}
                onClick={handleSchedule}
                className={classNames({
                  [classes.scheduled]: hasEvents(act),
                })}
              >
                <EventIcon className={classes.small} />
              </IconButton>
            </ListItemAvatar>
            <ListItemSecondaryAction>
              <IconButton
                value={act.id}
                onClick={handleDelete}
                disabled={hasEvents(act)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Modifier</DialogTitle>
        <DialogContent>
          <ActivityAddEditForm
            activity={activityEdit}
            onFinish={handleEditClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActivityList;
