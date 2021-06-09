import { IPhoto } from "./photo";

export interface IActivityCreate {
  name: string;
  price: number;
  place: string;
  rangeStart: Date;
  rangeEnd: Date;
  description?: string;
  photos: IPhoto[];
}
