import { IPerson } from "./person";

export interface IGuestResponse extends IPerson {
  id: string;
  createdDate: Date;
  eventId: string;
  absenceId?: string;
}
