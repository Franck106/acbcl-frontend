import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { fr } from 'date-fns/locale';

import { IEventResponse } from "../core/_types/eventResponse";

const locales = {
  "fr": fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  allDay: 'Journée',
  previous: 'Précédent',
  next: 'Suivant',
  today: 'Aujourd\'hui',
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  agenda: 'Agenda',
  date: 'Date',
  time: 'Heure',
  event: 'Evénement',
}

interface AppCalendarProps {
  eventList: IEventResponse[];
}

const AppCalendar: React.FC<AppCalendarProps> = ({ eventList }) => {
  const bigCalendarEvents = eventList.map((event) => ({
    title: event.summary ? event.summary : null,
    start: event.start,
    end: event.end,
  }));
  return (
    <div>
      <Calendar
        localizer={localizer}
        culture = 'fr'
        events={bigCalendarEvents}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        defaultView="month"
        style={{ height: 500 }}
        messages={messages}
      />
    </div>
  );
};

export default AppCalendar;
