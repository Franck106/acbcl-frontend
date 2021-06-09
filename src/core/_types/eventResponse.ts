export interface IEventResponse {
  id: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
  title?: string;
  location?: string;
  description?: string;
  activityId?: string;
  subscriptionIds: string[];
  userIds: string[];
  guestIds: string[];
  kidIds: string[];
}
