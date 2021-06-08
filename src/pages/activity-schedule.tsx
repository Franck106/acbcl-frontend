import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Container, makeStyles, Theme } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";

import ActivityEventAddForm from "../components/eventActivity-addForm";
import { IActivityResponse } from "../core/_types/activityResponse";
import { IRouteParams } from "../core/_types/route-params";
import { IAppState, Routes } from "../core";
import AppCalendar from "../components/app-calendar";
import RemoveEvent from "../components/event-remove";
import { fetchActivityById } from "../core/activity/actions";
import { IEventResponse } from "../core/_types/eventResponse";
import { fetchEvents } from "../core/event/actions";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  collapse: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ActivitySchedulePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<IRouteParams>();

  const activity = useSelector<IAppState, IActivityResponse>(
    ({ activity }) => activity.list[id]
  );

  const activityEvents = useSelector<IAppState, IEventResponse[]>(({ event }) =>
    Object.values(event.list).filter((event) => event.activityId === id)
  );

  useEffect(() => {
    if (!activity) {
      dispatch(fetchActivityById(id));
      dispatch(fetchEvents());
    }
    // eslint-disable-next-line
  }, [dispatch, activity, id]);

  if (!activity) {
    return <CircularProgress color="secondary" />;
  }

  const handleGoBack = () => {
    history.push(Routes.ADMIN_ACTIVITY);
  };

  return (
    <Container className={classes.root}>
      <IconButton onClick={handleGoBack}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" gutterBottom>
        Plannifier l'activité {activity.name}
      </Typography>
      <div className={classes.collapse}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="add-event"
            id="add-header"
          >
            <Typography className={classes.heading}>
              Ajouter une date
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ActivityEventAddForm activity={activity} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="remove-event"
            id="remove-header"
          >
            <Typography className={classes.heading}>
              Supprimer une date
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RemoveEvent activity={activity} />
          </AccordionDetails>
        </Accordion>
      </div>
      <AppCalendar eventList={activityEvents} />
    </Container>
  );
};

export default ActivitySchedulePage;
