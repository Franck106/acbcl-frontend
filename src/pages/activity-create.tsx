import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AddIcon from "@material-ui/icons/Add";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import ActivityCreateForm from "../components/activity-create-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../core/activity/actions";
import { IAppState } from "../core";
import { IActivityResponse } from "../core/_types/activityResponse";
import ActivityList from "../components/activity-list";

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

const ActivityCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActivities());
    // eslint-disable-next-line
  }, []);

  const activities = useSelector<IAppState, IActivityResponse[]>(
    ({ activity }) => Object.values(activity.list)
  );
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h4">Gérer les Activités</Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Ajouter une activité
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ActivityCreateForm />
        </AccordionDetails>
      </Accordion>
      {activities && <ActivityList activities={activities} />}
    </Container>
  );
};

export default ActivityCreatePage;
