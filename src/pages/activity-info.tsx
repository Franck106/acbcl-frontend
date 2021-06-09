import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "@material-ui/core/Container";
import { useParams } from "react-router";
import { IRouteParams } from "../core/_types/route-params";
import { IAppState, Routes } from "../core";
import { IActivityResponse } from "../core/_types/activityResponse";
import { fetchActivityById } from "../core/activity/actions";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const ActivityInfoPage: React.FC = () => {
  const { id } = useParams<IRouteParams>();
  const dispatch = useDispatch();
  const history = useHistory();

  const activity = useSelector<IAppState, IActivityResponse | undefined>(
    ({ activity }) => Object.values(activity.list).find((act) => act.id === id)
  );

  useEffect(() => {
    if (!activity) {
      dispatch(fetchActivityById(id));
    }
  }, [dispatch, activity, id]);

  if (!activity) {
    return <CircularProgress color="secondary" />;
  }

  const handleGoBack = () => {
    history.push(Routes.HOME);
  };

  return (
    <Container>
      <IconButton onClick={handleGoBack}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6" gutterBottom>
        {activity?.name}
      </Typography>
      <p>{activity.description}</p>
    </Container>
  );
};

export default ActivityInfoPage;
