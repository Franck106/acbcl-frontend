import { AppActionCreator } from "../_types/action";
import { IActivityCreate } from "../_types/activityCreate";
import { IActivityResponse } from "../_types/activityResponse";
import { IEventRequest } from "../_types/eventRequest";
import { IEventResponse } from "../_types/eventResponse";
import { IGuestResponse } from "../_types/guestResponse";
import { ISubscriptionGuest } from "../_types/subscription-guest";
import { ISubscriptionUser } from "../_types/subscription-user";
import { IUserResponse } from "../_types/userResponse";

export enum ActivityActions {
  FETCH_ACTIVITIES_PENDING = "activity/fetchPending",
  FETCH_ACTIVITIES_SUCCESS = "activity/fetchSuccess",
  FETCH_ACTIVITIES_ERROR = "activity/fetchError",
  CREATE_ACTIVITY_PENDING = "activity/createPending",
  CREATE_ACTIVITY_SUCCESS = "activity/createSuccess",
  CREATE_ACTIVITY_ERROR = "activity/createError",
  DELETE_ACTIVITY_PENDING = "activity/deletePending",
  DELETE_ACTIVITY_SUCCESS = "activity/deleteSuccess",
  DELETE_ACTIVITY_ERROR = "activity/deleteError",
  CREATE_EVENT_PENDING = "activity/createEventPending",
  CREATE_EVENT_SUCCESS = "activity/createEventSuccess",
  CREATE_EVENT_ERROR = "activity/createEventError",
  FETCH_EVENTS_PENDING = "activity/fetchEventPending",
  FETCH_EVENTS_SUCCESS = "activity/fetchEventSuccess",
  FETCH_EVENTS_ERROR = "activity/fetchEventError",
  SEND_SUBSCRIPTION_USER_PENDING = "activity/sendSubscriptionUserPending",
  SEND_SUBSCRIPTION_USER_SUCCESS = "activity/sendSubscriptionUserSuccess",
  SEND_SUBSCRIPTION_USER_ERROR = "activity/sendSubscriptionUserError",
  SEND_SUBSCRIPTION_GUEST_PENDING = "activity/sendSubscriptionGuestPending",
  SEND_SUBSCRIPTION_GUEST_SUCCESS = "activity/sendSubscriptionGuestSuccess",
  SEND_SUBSCRIPTION_GUEST_ERROR = "activity/sendSubscriptionGuestError",
}

export const fetchActivities: AppActionCreator<ActivityActions> = () => ({
  type: ActivityActions.FETCH_ACTIVITIES_PENDING,
});

export const fetchActivitiesSuccess: AppActionCreator<
  ActivityActions,
  IActivityResponse[]
> = (payload: IActivityResponse[]) => ({
  type: ActivityActions.FETCH_ACTIVITIES_SUCCESS,
  payload,
});

export const fetchActivitiesError: AppActionCreator<ActivityActions, Error> = (
  payload: Error
) => ({
  type: ActivityActions.FETCH_ACTIVITIES_ERROR,
  payload,
});

export const createActivity: AppActionCreator<
  ActivityActions,
  IActivityCreate
> = (payload: IActivityCreate) => ({
  type: ActivityActions.CREATE_ACTIVITY_PENDING,
  payload,
});

export const createActivitySuccess: AppActionCreator<
  ActivityActions,
  IActivityResponse
> = (payload: IActivityResponse) => ({
  type: ActivityActions.CREATE_ACTIVITY_SUCCESS,
  payload,
});

export const createActivityError: AppActionCreator<ActivityActions, Error> = (
  payload: Error
) => ({
  type: ActivityActions.CREATE_ACTIVITY_ERROR,
  payload,
});

export const deleteActivity: AppActionCreator<ActivityActions, string> = (
  payload: string
) => ({
  type: ActivityActions.DELETE_ACTIVITY_PENDING,
  payload,
});

export const deleteActivitySuccess: AppActionCreator<ActivityActions> = () => ({
  type: ActivityActions.DELETE_ACTIVITY_SUCCESS,
});

export const deleteActivityError: AppActionCreator<ActivityActions, Error> = (
  payload: Error
) => ({
  type: ActivityActions.DELETE_ACTIVITY_ERROR,
  payload,
});

export const createEvent: AppActionCreator<ActivityActions, IEventRequest> = (
  payload: IEventRequest
) => ({
  type: ActivityActions.CREATE_EVENT_PENDING,
  payload,
});

export const createEventSuccess: AppActionCreator<
  ActivityActions,
  IEventResponse
> = (payload: IEventResponse) => ({
  type: ActivityActions.CREATE_EVENT_SUCCESS,
  payload,
});

export const createEventError: AppActionCreator<ActivityActions, Error> = (
  payload: Error
) => ({
  type: ActivityActions.CREATE_EVENT_ERROR,
  payload,
});

export const fetchEvents: AppActionCreator<ActivityActions> = () => ({
  type: ActivityActions.FETCH_EVENTS_PENDING,
});

export const fetchEventsSuccess: AppActionCreator<
  ActivityActions,
  IEventResponse[]
> = (payload: IEventResponse[]) => ({
  type: ActivityActions.FETCH_EVENTS_SUCCESS,
  payload,
});

export const fetchEventsError: AppActionCreator<ActivityActions, Error> = (
  payload: Error
) => ({
  type: ActivityActions.FETCH_EVENTS_ERROR,
  payload,
});

export const sendSubscriptionUser: AppActionCreator<
  ActivityActions,
  ISubscriptionUser
> = (payload: ISubscriptionUser) => ({
  type: ActivityActions.SEND_SUBSCRIPTION_USER_PENDING,
  payload,
});

export const sendSubscriptionUserSuccess: AppActionCreator<
  ActivityActions,
  IUserResponse
> = (payload: IUserResponse) => ({
  type: ActivityActions.SEND_SUBSCRIPTION_USER_SUCCESS,
  payload,
});

export const sendSubscriptionUserError: AppActionCreator<
  ActivityActions,
  Error
> = (payload: Error) => ({
  type: ActivityActions.SEND_SUBSCRIPTION_USER_ERROR,
  payload,
});

export const sendSubscriptionGuest: AppActionCreator<
  ActivityActions,
  ISubscriptionGuest
> = (payload: ISubscriptionGuest) => ({
  type: ActivityActions.SEND_SUBSCRIPTION_GUEST_PENDING,
  payload,
});

export const sendSubscriptionGuestSuccess: AppActionCreator<
  ActivityActions,
  IGuestResponse
> = (payload: IGuestResponse) => ({
  type: ActivityActions.SEND_SUBSCRIPTION_GUEST_SUCCESS,
  payload,
});

export const sendSubscriptionGuestError: AppActionCreator<
  ActivityActions,
  Error
> = (payload: Error) => ({
  type: ActivityActions.SEND_SUBSCRIPTION_GUEST_ERROR,
  payload,
});
