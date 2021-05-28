import { combineEpics, Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IAppDependencies, IAppState } from "..";
import { AppAction } from "../_types/action";
import {
  ActivityActions,
  createActivityError,
  createActivitySuccess,
  createEventError,
  createEventSuccess,
  deleteActivityError,
  deleteActivitySuccess,
  fetchActivitiesError,
  fetchActivitiesSuccess,
  fetchEventsError,
  fetchEventsSuccess,
  sendSubscriptionGuestError,
  sendSubscriptionGuestSuccess,
  sendSubscriptionUserError,
  sendSubscriptionUserSuccess,
} from "./actions";

export type ActivityEpic = Epic<
  AppAction<ActivityActions>,
  AppAction<ActivityActions>,
  IAppState,
  IAppDependencies
>;

export const activityListEpic: ActivityEpic = (
  action$,
  state,
  { activityApi }
) =>
  action$.pipe(
    ofType(ActivityActions.FETCH_ACTIVITIES_PENDING),
    switchMap(() => activityApi.getAllActivities()),
    map(fetchActivitiesSuccess),
    catchError((err) => of(fetchActivitiesError(err)))
  );

export const createActivityEpic: ActivityEpic = (
  action$,
  state,
  { activityApi }
) =>
  action$.pipe(
    ofType(ActivityActions.CREATE_ACTIVITY_PENDING),
    switchMap(({ payload }) => activityApi.addActivity(payload)),
    map(createActivitySuccess),
    catchError((err) => of(createActivityError(err)))
  );

export const deleteActivityEpic: ActivityEpic = (
  action$,
  state,
  { activityApi }
) =>
  action$.pipe(
    ofType(ActivityActions.DELETE_ACTIVITY_PENDING),
    switchMap(({ payload }) => activityApi.removeActivity(payload)),
    map(deleteActivitySuccess),
    catchError((err) => of(deleteActivityError(err)))
  );

export const createEventEpic: ActivityEpic = (
  action$,
  state,
  { activityApi }
) =>
  action$.pipe(
    ofType(ActivityActions.CREATE_EVENT_PENDING),
    switchMap(({ payload }) => activityApi.createEvent(payload)),
    map(createEventSuccess),
    catchError((err) => of(createEventError(err)))
  );

export const eventListEpic: ActivityEpic = (action$, state, { activityApi }) =>
  action$.pipe(
    ofType(ActivityActions.FETCH_EVENTS_PENDING),
    switchMap(() => activityApi.getComingEvents()),
    map(fetchEventsSuccess),
    catchError((err) => of(fetchEventsError(err)))
  );

export const subscriptionUserEpic: ActivityEpic = (
  action$,
  state,
  { activityApi }
) =>
  action$.pipe(
    ofType(ActivityActions.SEND_SUBSCRIPTION_USER_PENDING),
    switchMap(({ payload }) => activityApi.applySubscriptionUser(payload)),
    map(sendSubscriptionUserSuccess),
    catchError((err) => of(sendSubscriptionUserError(err)))
  );

export const subscriptionGuestEpic: ActivityEpic = (
  action$,
  state,
  { activityApi }
) =>
  action$.pipe(
    ofType(ActivityActions.SEND_SUBSCRIPTION_GUEST_PENDING),
    switchMap(({ payload }) => activityApi.applySubscriptionGuest(payload)),
    map(sendSubscriptionGuestSuccess),
    catchError((err) => of(sendSubscriptionGuestError(err)))
  );

export default combineEpics(
  activityListEpic,
  createActivityEpic,
  deleteActivityEpic,
  createEventEpic,
  eventListEpic,
  subscriptionUserEpic,
  subscriptionGuestEpic
);
