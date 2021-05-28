import { IEventResponse } from "./eventResponse";

export interface IGuestResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  address: string;
  postCode: string;
  city: string;
  phone: string;
  event: IEventResponse;
}
