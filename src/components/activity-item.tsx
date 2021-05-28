import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { IActivityResponse } from "../core/_types/activityResponse";

interface ActivityItemProps {
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

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const classes = useStyles();
  return (
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
          <Typography variant="h6">{activity.price} €</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          S'inscrire
        </Button>
        <Button size="small" color="primary">
          En savoir plus...
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActivityItem;
