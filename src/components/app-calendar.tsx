import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { fr } from "date-fns/locale";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { IEventResponse } from "../core/_types/eventResponse";
import EventItem from "./event-item";
import SingleEventAddEditForm from "./eventSingle-addEditForm";
import { IEventCreate } from "../core/_types/eventCreate";
import { deleteSingleEvent } from "../core/event/actions";

const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  allDay: "Journée",
  previous: "Précédent",
  next: "Suivant",
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "Evénement",
};

interface AppCalendarProps {
  eventList: IEventResponse[];
}

const AppCalendar: React.FC<AppCalendarProps> = ({ eventList }) => {
  const dispatch = useDispatch();
  
  const tooltipInfo = (event: any) => {
    const startTime = format(new Date(event.start), 'dd/MM/yyyy');
    const endTime = format(new Date(event.end), "dd/MM/yyyy");
    return startTime + " - " + endTime;
  };

  const [newEvent, setNewEvent] = useState<IEventCreate>();
  const handleSelect = (slotInfo: any) => {
    setNewEvent({
      title: "(sans titre)",
      start: slotInfo.start,
      end: slotInfo.end,
      isAllDay: false,
    });
    setOpen(true);
  };

  const [event, setEvent] = useState<IEventResponse>();

  const handleEventEdit = (event: IEventResponse) => {
    setEvent(event);
    setOpen(true);
  };

  const handleRemoveEvent = () => {
    if (event) {
      dispatch(deleteSingleEvent(event?.id));
    }
    handleClose();
  };

  const dialogTitle = newEvent
    ? "Créer un évènement ponctuel"
    : event
    ? "Modifier l'évènement " + event.title
    : "";

  const canDelete = newEvent ? true : false;

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Calendar
        components={{ event: EventItem }}
        localizer={localizer}
        culture="fr"
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        style={{ height: "70vh" }}
        messages={messages}
        tooltipAccessor={tooltipInfo}
        popup
        drilldownView="day"
        selectable
        onSelectEvent={handleEventEdit}
        onSelectSlot={handleSelect}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {dialogTitle}

          <IconButton onClick={handleRemoveEvent} disabled={canDelete}>
            <DeleteIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <SingleEventAddEditForm
            newEvent={newEvent}
            eventEdit={event}
            onFinish={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppCalendar;
