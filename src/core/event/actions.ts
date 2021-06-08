import { AppActionCreator } from "../_types/action";
import { IDeleteActivityEventPayload } from "../_types/deleteActivityEventPayload";
import { IEventCreate } from "../_types/eventCreate";
import { IEventResponse } from "../_types/eventResponse";
import { IGuestCreate } from "../_types/guestCreate";
import { IGuestResponse } from "../_types/guestResponse";
import { ISubscriptionCreate } from "../_types/subscriptionCreate";
import { ISubscriptionResponse } from "../_types/subscriptionResponse";

export enum EventActions {
  CREATE_EVENT_PENDING = "event/createEventPending",
  CREATE_EVENT_SUCCESS = "event/createEventSuccess",
  CREATE_EVENT_ERROR = "event/createEventError",
  DELETE_EVENT_PENDING = "event/deleteEventPending",
  DELETE_EVENT_SUCCESS = "event/deleteEventSuccess",
  DELETE_EVENT_ERROR = "event/deleteEventError",
  CREATE_SINGLE_EVENT_PENDING = "event/createSingleEventPending",
  CREATE_SINGLE_EVENT_SUCCESS = "event/createSingleEventSuccess",
  CREATE_SINGLE_EVENT_ERROR = "event/createSingleEventError",
  DELETE_SINGLE_EVENT_PENDING = "event/deleteSingleEventPending",
  DELETE_SINGLE_EVENT_SUCCESS = "event/deleteSingleEventSuccess",
  DELETE_SINGLE_EVENT_ERROR = "event/deleteSingleEventError",
  FETCH_EVENTS_PENDING = "event/fetchEventPending",
  FETCH_EVENTS_SUCCESS = "event/fetchEventSuccess",
  FETCH_EVENTS_ERROR = "event/fetchEventError",
  SEND_SUBSCRIPTION_PENDING = "event/sendSubscriptionPending",
  SEND_SUBSCRIPTION_SUCCESS = "event/sendSubscriptionSuccess",
  SEND_SUBSCRIPTION_ERROR = "event/sendSubscriptionError",
  CREATE_GUEST_PENDING = "event/createGuestPending",
  CREATE_GUEST_SUCCESS = "event/createGuestSuccess",
  CREATE_GUEST_ERROR = "event/createGuestError",
  FETCH_SUBSCRIPTIONS_PENDING = "event/fetchSubscriptionsPending",
  FETCH_SUBSCRIPTIONS_SUCCESS = "event/fetchSubscriptionsSuccess",
  FETCH_SUBSCRIPTIONS_ERROR = "event/fetchSubscriptionsError",
  VALIDATE_SUBSCRIPTION_PENDING = "event/validateSubscriptionsPending",
  VALIDATE_SUBSCRIPTION_SUCCESS = "event/validateSubscriptionsSuccess",
  VALIDATE_SUBSCRIPTION_ERROR = "event/validateSubscriptionsError",
  DELETE_SUBSCRIPTION_PENDING = "event/deleteSubscriptionPending",
  DELETE_SUBSCRIPTION_SUCCESS = "event/deleteSubscriptionSuccess",
  DELETE_SUBSCRIPTION_ERROR = "event/deleteSubscriptionError",
}

export const createEvent: AppActionCreator<EventActions, IEventCreate> = (
  payload: IEventCreate
) => ({
  type: EventActions.CREATE_EVENT_PENDING,
  payload,
});

export const createEventSuccess: AppActionCreator<
  EventActions,
  IEventResponse
> = (payload: IEventResponse) => ({
  type: EventActions.CREATE_EVENT_SUCCESS,
  payload,
});

export const createEventError: AppActionCreator<EventActions, Error> = (
  payload: Error
) => ({
  type: EventActions.CREATE_EVENT_ERROR,
  payload,
});

export const deleteEvent: AppActionCreator<
  EventActions,
  IDeleteActivityEventPayload
> = (payload: IDeleteActivityEventPayload) => ({
  type: EventActions.DELETE_EVENT_PENDING,
  payload,
});

export const deleteEventSuccess: AppActionCreator<EventActions> = () => ({
  type: EventActions.DELETE_EVENT_SUCCESS,
});

export const deleteEventError: AppActionCreator<EventActions, Error> = (
  payload: Error
) => ({
  type: EventActions.DELETE_EVENT_ERROR,
  payload,
});

export const createSingleEvent: AppActionCreator<EventActions, IEventCreate> = (
  payload: IEventCreate
) => ({
  type: EventActions.CREATE_SINGLE_EVENT_PENDING,
  payload,
});

export const createSingleEventSuccess: AppActionCreator<
  EventActions,
  IEventResponse
> = (payload: IEventResponse) => ({
  type: EventActions.CREATE_SINGLE_EVENT_SUCCESS,
  payload,
});

export const createSingleEventError: AppActionCreator<EventActions, Error> = (
  payload: Error
) => ({
  type: EventActions.CREATE_SINGLE_EVENT_ERROR,
  payload,
});

export const deleteSingleEvent: AppActionCreator<EventActions, string> = (
  payload: string
) => ({
  type: EventActions.DELETE_SINGLE_EVENT_PENDING,
  payload,
});

export const deleteSingleEventSuccess: AppActionCreator<EventActions> = () => ({
  type: EventActions.DELETE_SINGLE_EVENT_SUCCESS,
});

export const deleteSingleEventError: AppActionCreator<EventActions, Error> = (
  payload: Error
) => ({
  type: EventActions.DELETE_SINGLE_EVENT_ERROR,
  payload,
});

export const fetchEvents: AppActionCreator<EventActions> = () => ({
  type: EventActions.FETCH_EVENTS_PENDING,
});

export const fetchEventsSuccess: AppActionCreator<
  EventActions,
  IEventResponse[]
> = (payload: IEventResponse[]) => ({
  type: EventActions.FETCH_EVENTS_SUCCESS,
  payload,
});

export const fetchEventsError: AppActionCreator<EventActions, Error> = (
  payload: Error
) => ({
  type: EventActions.FETCH_EVENTS_ERROR,
  payload,
});

export const sendSubscription: AppActionCreator<
  EventActions,
  ISubscriptionCreate
> = (payload: ISubscriptionCreate) => ({
  type: EventActions.SEND_SUBSCRIPTION_PENDING,
  payload,
});

export const sendSubscriptionSuccess: AppActionCreator<
  EventActions,
  ISubscriptionResponse
> = (payload: ISubscriptionResponse) => ({
  type: EventActions.SEND_SUBSCRIPTION_SUCCESS,
  payload,
});

export const sendSubscriptionError: AppActionCreator<EventActions, Error> = (
  payload: Error
) => ({
  type: EventActions.SEND_SUBSCRIPTION_ERROR,
  payload,
});

export const deleteSubscription: AppActionCreator<
  EventActions,
  string
> = (payload: string) => ({
  type: EventActions.DELETE_SUBSCRIPTION_PENDING,
  payload,
});

export const deleteSubscriptionSuccess: AppActionCreator<EventActions> = () => ({
  type: EventActions.DELETE_SUBSCRIPTION_SUCCESS,
});

export const deleteSubscriptionError: AppActionCreator<EventActions, Error> = (
  payload: Error
) => ({
  type: EventActions.DELETE_SUBSCRIPTION_ERROR,
  payload,
});

export const createGuest: AppActionCreator<EventActions, IGuestCreate> = (
  payload: IGuestCreate
) => ({
  type: EventActions.CREATE_GUEST_PENDING,
  payload,
});

export const createGuestSuccess: AppActionCreator<
  EventActions,
  IGuestResponse
> = (payload: IGuestResponse) => ({
  type: EventActions.CREATE_GUEST_SUCCESS,
  payload,
});

export const createGuestError: AppActionCreator<EventActions, Error> = (
  payload: Error
) => ({
  type: EventActions.CREATE_GUEST_ERROR,
  payload,
});

export const fetchSubscriptions: AppActionCreator<EventActions> = () => ({
  type: EventActions.FETCH_SUBSCRIPTIONS_PENDING,
});

export const fetchSubscriptionsSuccess: AppActionCreator<
  EventActions,
  ISubscriptionResponse[]
> = (payload: ISubscriptionResponse[]) => ({
  type: EventActions.FETCH_SUBSCRIPTIONS_SUCCESS,
  payload,
});

export const fetchSubscriptionsError: AppActionCreator<EventActions, Error> = (
  payload: Error
) => ({
  type: EventActions.FETCH_SUBSCRIPTIONS_ERROR,
  payload,
});

export const validateSubscription: AppActionCreator<EventActions, string> = (
  payload: string
) => ({
  type: EventActions.VALIDATE_SUBSCRIPTION_PENDING,
  payload,
});

export const validateSubscriptionSuccess: AppActionCreator<
  EventActions,
  IEventResponse[]
> = (payload: IEventResponse[]) => ({
  type: EventActions.VALIDATE_SUBSCRIPTION_SUCCESS,
  payload,
});

export const validateSubscriptionError: AppActionCreator<EventActions, Error> =
  (payload: Error) => ({
    type: EventActions.VALIDATE_SUBSCRIPTION_ERROR,
    payload,
  });
