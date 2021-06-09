import { IPerson } from "./person";

export interface IUserCreate extends IPerson {
  password: string;
}
