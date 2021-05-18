import { Reducer } from "redux";
import { Status } from "../_enum/Status";
import { AppAction } from "../_types/action";
import { IActivityResponse } from "../_types/activityResponse";
import { ActivityActions } from "./actions";

export interface IActivityState {
  list: Record<string, IActivityResponse>;
  status: string;
  error: string | null;
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
        list: action.payload.reduce((acc: any, activity: IActivityResponse) => ({
           
            ...acc,
            [activity.id]: activity,
        }),{}),
      };
    default:
      return state;
  }
};
