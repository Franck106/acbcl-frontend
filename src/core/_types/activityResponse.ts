import { IEventResponse } from "./eventResponse";
import { IPhoto } from "./photo";

export interface IActivityResponse {
  id: string;
  name: string;
  price: number;
  place: string;
  rangeStart: Date;
  rangeEnd: Date;
  description?: string;
  photos: IPhoto[];
  eventIds: string[];
  subscriptionIds: string[];
}
