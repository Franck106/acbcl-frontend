import { IActivityResponse } from "./activityResponse";
import { IUserResponse } from "./userResponse";

export interface ISubscriptionUser {
  activity: IActivityResponse;
  user: IUserResponse;
}
