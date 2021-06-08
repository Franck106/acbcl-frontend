import { AppActionCreator } from "../_types/action";
import { IActivityCreate } from "../_types/activityCreate";
import { IActivityResponse } from "../_types/activityResponse";

export enum ActivityActions {
  FETCH_ACTIVITIES_PENDING = "activity/fetchPending",
  FETCH_ACTIVITIES_SUCCESS = "activity/fetchSuccess",
  FETCH_ACTIVITIES_ERROR = "activity/fetchError",
  FETCH_ACTIVITY_ID_PENDING = "activity/fetchByIdPending",
  FETCH_ACTIVITY_ID_SUCCESS = "activity/fetchByIdSuccess",
  FETCH_ACTIVITY_ID_ERROR = "activity/fetchByIdError",
  CREATE_ACTIVITY_PENDING = "activity/createPending",
  CREATE_ACTIVITY_SUCCESS = "activity/createSuccess",
  CREATE_ACTIVITY_ERROR = "activity/createError",
  UPDATE_ACTIVITY_PENDING = "activity/updatePending",
  UPDATE_ACTIVITY_SUCCESS = "activity/updateSuccess",
  UPDATE_ACTIVITY_ERROR = "activity/updateError",
  DELETE_ACTIVITY_PENDING = "activity/deletePending",
  DELETE_ACTIVITY_SUCCESS = "activity/deleteSuccess",
  DELETE_ACTIVITY_ERROR = "activity/deleteError",
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

export const fetchActivityById: AppActionCreator<ActivityActions, string> = (
  payload: string
) => ({
  type: ActivityActions.FETCH_ACTIVITY_ID_PENDING,
  payload,
});

export const fetchActivityByIdSuccess: AppActionCreator<
  ActivityActions,
  IActivityResponse
> = (payload: IActivityResponse) => ({
  type: ActivityActions.FETCH_ACTIVITY_ID_SUCCESS,
  payload,
});

export const fetchActivityByIdError: AppActionCreator<ActivityActions, Error> =
  (payload: Error) => ({
    type: ActivityActions.FETCH_ACTIVITY_ID_ERROR,
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

export const updateActivity: AppActionCreator<
  ActivityActions,
  IActivityResponse
> = (payload: IActivityResponse) => ({
  type: ActivityActions.UPDATE_ACTIVITY_PENDING,
  payload,
});

export const updateActivitySuccess: AppActionCreator<
  ActivityActions,
  IActivityResponse
> = (payload: IActivityResponse) => ({
  type: ActivityActions.UPDATE_ACTIVITY_SUCCESS,
  payload,
});

export const updateActivityError: AppActionCreator<ActivityActions, Error> = (
  payload: Error
) => ({
  type: ActivityActions.UPDATE_ACTIVITY_ERROR,
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
