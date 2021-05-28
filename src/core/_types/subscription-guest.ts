import { IActivityResponse } from "./activityResponse";
import { IGuestCreate } from "./guestCreate";

export interface ISubscriptionGuest {
  activity: IActivityResponse;
  guest: IGuestCreate;
}
