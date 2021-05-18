import { AppActionCreator } from "../_types/action";
import { IActivityResponse } from "../_types/activityResponse";

export enum ActivityActions {
  FETCH_ACTIVITIES_PENDING = "activity/fetchPending",
  FETCH_ACTIVITIES_SUCCESS = "activity/fetchSuccess",
  FETCH_ACTIVITIES_ERROR = "activity/fetchError",
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
