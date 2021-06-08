import { IPerson } from "./person";

export interface IGuestCreate extends IPerson {
  eventId: string;
}
