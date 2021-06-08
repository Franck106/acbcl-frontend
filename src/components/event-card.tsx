import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { useDispatch } from "react-redux";
import { fetchSubscriptions } from "../core/event/actions";
import { IEventResponse } from "../core/_types/eventResponse";
import GuestCreateForm from "./guestCreate-form";

interface EventCardProps {
  event: IEventResponse;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubscriptions());
    // eslint-disable-next-line
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/images/kid-play.png"
            title="Kid play"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {event.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {event.location}
            </Typography>
            <Typography>{event.description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOpen}>
            S'inscrire
          </Button>
          <Button value={event.id} size="small" color="primary">
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
        <DialogTitle id="form-dialog-title">Inscription {event.title}</DialogTitle>
        <DialogContent>
          <GuestCreateForm event={event} onFinish={handleClose} />
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

export default EventCard;
