import { IPhoto } from "./photo";

export interface IActivityCreate {
  name: string;
  price: number;
  place: string;
  description?: string;
  photos: IPhoto[];
}
