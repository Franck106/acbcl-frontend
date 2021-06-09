import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppCalendar from "../components/app-calendar";
import { IAppState } from "../core";
import { fetchEvents } from "../core/event/actions";
import { IEventResponse } from "../core/_types/eventResponse";

const CalendarPublicPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
    // eslint-disable-next-line
  }, []);

  const events = useSelector<IAppState, IEventResponse[]>(({ event }) =>
    Object.values(event.list)
  );

  return <AppCalendar eventList={events} />;
};

export default CalendarPublicPage;
