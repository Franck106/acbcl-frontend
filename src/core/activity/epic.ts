import { combineEpics, Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IAppDependencies, IAppState } from "..";
import { AppAction } from "../_types/action";
import {
  ActivityActions,
  createActivityError,
  createActivitySuccess,
  deleteActivityError,
  deleteActivitySuccess,
  fetchActivitiesError,
  fetchActivitiesSuccess,
  fetchActivityByIdError,
  fetchActivityByIdSuccess,
  updateActivityError,
  updateActivitySuccess,
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

export const activityEpic: ActivityEpic = (action$, state, { activityApi }) =>
  action$.pipe(
    ofType(ActivityActions.FETCH_ACTIVITY_ID_PENDING),
    switchMap(({ payload }) => activityApi.getActivityById(payload)),
    map(fetchActivityByIdSuccess),
    catchError((err) => of(fetchActivityByIdError(err)))
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

export const updateActivityEpic: ActivityEpic = (
  action$,
  state,
  { activityApi }
) =>
  action$.pipe(
    ofType(ActivityActions.UPDATE_ACTIVITY_PENDING),
    switchMap(({ payload }) => activityApi.updateActivity(payload)),
    map(updateActivitySuccess),
    catchError((err) => of(updateActivityError(err)))
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



export default combineEpics(
  activityListEpic,
  activityEpic,
  createActivityEpic,
  updateActivityEpic,
  deleteActivityEpic,
);
