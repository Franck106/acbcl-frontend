import { combineEpics, Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IAppDependencies, IAppState } from "..";
import { AppAction } from "../_types/action";
import {
  ActivityActions,
  fetchActivitiesError,
  fetchActivitiesSuccess,
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

  export default combineEpics(activityListEpic);
