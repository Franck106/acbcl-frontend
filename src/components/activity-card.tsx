import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

import { IActivityResponse } from "../core/_types/activityResponse";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { useDispatch } from "react-redux";
import { fetchSubscriptions } from "../core/event/actions";
import ActivitySubscribe from "./activity-subscribe";
import { useConnectedUser } from "../core/hooks/connectedUser-hook";

interface ActivityCardProps {
  activity: IActivityResponse;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchSubscriptions());
    // eslint-disable-next-line
  }, []);

  const connectedUser = useConnectedUser(activity);
  const buttonLabel = connectedUser?.hasSubscribed ? "Inscrit" : "S'inscrire";

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActivityInfo = (e: any) => {
    history.push("/activity/"+ e.currentTarget.value);
  }
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={activity.photos[0].url}
            title="Kid play"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {activity.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {activity.place}
            </Typography>
            <Typography>{activity.description}</Typography>
            <Typography variant="h6">{activity.price} €</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOpen}>
            {buttonLabel}
          </Button>
          <Button value={activity.id} size="small" color="primary" onClick={handleActivityInfo}>
            En savoir plus...
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Inscription {activity.name}</DialogTitle>
        <DialogContent>
          {connectedUser && (
            <ActivitySubscribe
              connectedUser={connectedUser}
              activity={activity}
              onFinish={handleClose}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActivityCard;
