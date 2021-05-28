import { IActivityResponse } from "./activityResponse";

export interface IEventRequest {
  start: Date;
  end: Date;
  activity?: IActivityResponse;
  summary?: string;
  location?: string;
  description?: string;
  colorId?: number;
  attendees?: { email: string }[];
}
