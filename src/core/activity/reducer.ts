import { Reducer } from "redux";

import { Status } from "../_enum/Status";
import { AppAction } from "../_types/action";
import { IActivityResponse } from "../_types/activityResponse";
import { ActivityActions } from "./actions";

export interface IActivityState {
  list: Record<string, IActivityResponse>;
  status: Status;
  error: string | null;
  stash?: any;
}

const initialState: IActivityState = {
  list: {},
  status: Status.IDLE,
  error: null,
};

export const activityReducer: Reducer<
  IActivityState,
  AppAction<ActivityActions>
> = (state = initialState, action) => {
  switch (action.type) {
    case ActivityActions.FETCH_ACTIVITIES_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case ActivityActions.FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        list: action.payload.reduce(
          (acc: any, activity: IActivityResponse) => ({
            ...acc,
            [activity.id]: activity,
          }),
          {}
        ),
      };
    case ActivityActions.FETCH_ACTIVITIES_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
      };
    case ActivityActions.FETCH_ACTIVITY_ID_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case ActivityActions.FETCH_ACTIVITY_ID_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        list: {
          ...state.list,
          [action.payload.id]: action.payload,
        },
      };
    case ActivityActions.FETCH_ACTIVITY_ID_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
      };
    case ActivityActions.CREATE_ACTIVITY_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case ActivityActions.CREATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        list: {
          ...state.list,
          [action.payload.id]: action.payload,
        },
      };
    case ActivityActions.CREATE_ACTIVITY_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
      };
    case ActivityActions.UPDATE_ACTIVITY_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case ActivityActions.UPDATE_ACTIVITY_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        list: {
          ...state.list,
          [action.payload.id]: action.payload,
        },
      };
    case ActivityActions.UPDATE_ACTIVITY_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
      };
    case ActivityActions.DELETE_ACTIVITY_PENDING:
      return {
        ...state,
        status: Status.PENDING,
        stash: state.list[action.payload],
        list: Object.entries(state.list)
          .filter(([key]) => key !== action.payload)
          .reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: value,
            }),
            {}
          ),
      };
    case ActivityActions.DELETE_ACTIVITY_SUCCESS:
      return {
        list: state.list,
        status: Status.COMPLETED,
        error: null,
      };
    case ActivityActions.DELETE_ACTIVITY_ERROR:
      return {
        list: {
          ...state.list,
          [state.stash?.id]: state.stash,
        },
        status: Status.FAILED,
        error: action.payload.message,
      };
    
    default:
      return state;
  }
};
