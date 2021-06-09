import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import ActivityAddEditForm from "../components/activity-addEditForm";
import ActivityList from "../components/activity-list";
import { fetchEvents } from "../core/event/actions";
import { fetchActivities } from "../core/activity/actions";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const EventManagePage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchActivities());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Container className={classes.root}>
      <Typography variant="h4">Gérer les Evènements</Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Ajouter un évènement
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ActivityAddEditForm />
        </AccordionDetails>
      </Accordion>
      <ActivityList />
    </Container>
  );
};

export default EventManagePage;
