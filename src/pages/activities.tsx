import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { useDispatch, useSelector } from "react-redux";

import { Routes } from "../core/_enum/Routes";
import { fetchActivities } from "../core/activity/actions";
import { IActivityResponse } from "../core/_types/activityResponse";
import { IAppState } from "../core";
import { Typography } from "@material-ui/core";

const ActivitiesPage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActivities());
    // eslint-disable-next-line
  }, []);

  const activities = useSelector<IAppState, IActivityResponse[]>(
    ({ activity }) => Object.values(activity.list)
  );
  return (
    <div>
      <Typography variant="h2">Activités</Typography>
      <Link href={Routes.HOME}>back to home</Link>
      {activities 
      ? <div>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>{activity.name}</li>
                ))}
            </ul>
        </div>
       : null}
    </div>
  );
};

export default ActivitiesPage;
