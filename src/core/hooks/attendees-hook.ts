import { useSelector } from "react-redux";

import { IAppState } from "..";
import { IActivityResponse } from "../_types/activityResponse";
import { IEventResponse } from "../_types/eventResponse";
import { IUserResponse } from "../_types/userResponse";

export const useAttendees = (activity: IActivityResponse): IUserResponse[] => {
  const { events, users } = useSelector<IAppState, any>(({ event, user }) => ({
    events: Object.values(event.list),
    users: Object.values(user.list),
  }));

  const activityNextEvent = events.find(
    (evt: IEventResponse) => evt.activityId === activity.id
  );

  return users.filter((user: IUserResponse) =>
    activityNextEvent?.userIds.includes(user.id)
  );
};
