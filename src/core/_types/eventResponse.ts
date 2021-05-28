import { IActivityResponse } from "./activityResponse";

export interface IEventResponse {
  id: string;
  start: Date;
  end: Date;
  activityId?: string;
  summary?: string;
  location?: string;
  description?: string;
  colorId?: number;
  attendees?: { email: string }[];
}
