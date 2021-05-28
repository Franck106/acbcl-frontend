import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppCalendar from "../components/app-calendar";
import { IAppState } from "../core";
import { fetchEvents } from "../core/activity/actions";
import { IEventResponse } from "../core/_types/eventResponse";

const ActivitiesCalendarPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
    // eslint-disable-next-line
  }, []);

  const events = useSelector<IAppState, IEventResponse[]>(({ activity }) =>
    Object.values(activity.eventList)
  );

  return <AppCalendar eventList={events} />;
};

export default ActivitiesCalendarPage;
