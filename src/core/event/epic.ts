import { combineEpics, Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IAppDependencies, IAppState } from "..";
import { AppAction } from "../_types/action";
import {
  createEventError,
  createEventSuccess,
  createGuestError,
  createGuestSuccess,
  createSingleEventError,
  createSingleEventSuccess,
  deleteEventError,
  deleteEventSuccess,
  deleteSingleEventError,
  deleteSingleEventSuccess,
  deleteSubscriptionError,
  deleteSubscriptionSuccess,
  EventActions,
  fetchEventsError,
  fetchEventsSuccess,
  fetchSubscriptionsError,
  fetchSubscriptionsSuccess,
  sendSubscriptionError,
  sendSubscriptionSuccess,
  validateSubscriptionError,
  validateSubscriptionSuccess,
} from "./actions";

export type EventEpic = Epic<
  AppAction<EventActions>,
  AppAction<EventActions>,
  IAppState,
  IAppDependencies
>;

export const createEventEpic: EventEpic = (action$, state, { calendarApi }) =>
  action$.pipe(
    ofType(EventActions.CREATE_EVENT_PENDING),
    switchMap(({ payload }) => calendarApi.createActivityEvent(payload)),
    map(createEventSuccess),
    catchError((err) => of(createEventError(err)))
  );

export const deleteEventEpic: EventEpic = (action$, state, { calendarApi }) =>
  action$.pipe(
    ofType(EventActions.DELETE_EVENT_PENDING),
    switchMap(({ payload }) => calendarApi.removeEvent(payload.eventId)),
    map(deleteEventSuccess),
    catchError((err) => of(deleteEventError(err)))
  );

export const createSingleEventEpic: EventEpic = (
  action$,
  state,
  { calendarApi }
) =>
  action$.pipe(
    ofType(EventActions.CREATE_SINGLE_EVENT_PENDING),
    switchMap(({ payload }) => calendarApi.addSingleEvent(payload)),
    map(createSingleEventSuccess),
    catchError((err) => of(createSingleEventError(err)))
  );

export const deleteSingleEventEpic: EventEpic = (
  action$,
  state,
  { calendarApi }
) =>
  action$.pipe(
    ofType(EventActions.DELETE_SINGLE_EVENT_PENDING),
    switchMap(({ payload }) => calendarApi.removeEvent(payload)),
    map(deleteSingleEventSuccess),
    catchError((err) => of(deleteSingleEventError(err)))
  );

export const eventListEpic: EventEpic = (action$, state, { calendarApi }) =>
  action$.pipe(
    ofType(EventActions.FETCH_EVENTS_PENDING),
    switchMap(() => calendarApi.getComingEvents()),
    map(fetchEventsSuccess),
    catchError((err) => of(fetchEventsError(err)))
  );

export const createSubscriptionEpic: EventEpic = (
  action$,
  state,
  { calendarApi }
) =>
  action$.pipe(
    ofType(EventActions.SEND_SUBSCRIPTION_PENDING),
    switchMap(({ payload }) => calendarApi.createSubscription(payload)),
    map(sendSubscriptionSuccess),
    catchError((err) => of(sendSubscriptionError(err)))
  );

  export const deleteSubscriptionEpic: EventEpic = (action$, state, { calendarApi }) =>
  action$.pipe(
    ofType(EventActions.DELETE_SUBSCRIPTION_PENDING),
    switchMap(({ payload }) => calendarApi.removeSubscription(payload)),
    map(deleteSubscriptionSuccess),
    catchError((err) => of(deleteSubscriptionError(err)))
  );

  export const createGuestEpic: EventEpic = (action$, state, { calendarApi }) =>
  action$.pipe(
    ofType(EventActions.CREATE_GUEST_PENDING),
    switchMap(({ payload }) => calendarApi.createGuest(payload)),
    map(createGuestSuccess),
    catchError((err) => of(createGuestError(err)))
  );

  export const subscriptionsListEpic: EventEpic = (action$, state, { calendarApi }) =>
  action$.pipe(
    ofType(EventActions.FETCH_SUBSCRIPTIONS_PENDING),
    switchMap(() => calendarApi.getAllSubscriptions()),
    map(fetchSubscriptionsSuccess),
    catchError((err) => of(fetchSubscriptionsError(err)))
  );

  export const validateSubscriptionEpic: EventEpic = (action$, state, { calendarApi }) =>
  action$.pipe(
    ofType(EventActions.VALIDATE_SUBSCRIPTION_PENDING),
    switchMap(({ payload }) => calendarApi.getSubscriptionValidate(payload)),
    map(validateSubscriptionSuccess),
    catchError((err) => of(validateSubscriptionError(err)))
  );

export default combineEpics(
  createEventEpic,
  deleteEventEpic,
  createSingleEventEpic,
  deleteSingleEventEpic,
  eventListEpic,
  createSubscriptionEpic,
  deleteSubscriptionEpic,
  createGuestEpic,
  subscriptionsListEpic,
  validateSubscriptionEpic
);
