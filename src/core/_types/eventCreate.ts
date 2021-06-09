export interface IEventCreate {
  start: Date;
  end: Date;
  isAllDay: boolean;
  title: string;
  activityId?: string;
  location?: string;
  description?: string;
}
