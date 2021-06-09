import React from "react";

import { IEventResponse } from "../core/_types/eventResponse";

interface EventItemProps {
  event: IEventResponse;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.description && ": " + event.description}
    </span>
  );
};

export default EventItem;
