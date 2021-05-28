import { Reducer } from "redux";

import { Status } from "../_enum/Status";
import { AppAction } from "../_types/action";
import { IUserResponse } from "../_types/userResponse";
import { UserActions } from "./actions";

export interface IUserState {
  status: Status;
  error: string | null;
  token: string;
  user?: IUserResponse;
}

export const initialState: IUserState = {
  status: Status.IDLE,
  error: null,
  token: "",
};

export const userReducer: Reducer<IUserState, AppAction<UserActions>> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserActions.POST_CREDENTIALS_PENDING:
      return {
        ...state,
        status: Status.PENDING,
        isLoginOpen: true,
      };
    case UserActions.POST_CREDENTIALS_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        token: action.payload.token,
        user: action.payload.user,
        isLoginOpen: false,
      };
    case UserActions.POST_CREDENTIALS_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
        isLoginOpen: true,
      };
    case UserActions.FETCH_USER_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case UserActions.FETCH_USER_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        user: action.payload,
      };
    case UserActions.FETCH_USER_ERROR:
      return {
        status: Status.FAILED,
        token: "",
        error: action.payload.message,
        isLoginOpen: true,
      };
    case UserActions.POST_USER_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case UserActions.POST_USER_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        token: action.payload.token,
        user: action.payload.user,
      };
    case UserActions.POST_USER_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
      };
    case UserActions.USER_SIGNOUT:
      return initialState;
    case UserActions.CLEAR_ERROR:
      return {
        ...state,
        error: null,
        status: Status.IDLE,
      };
    default:
      return state;
  }
};
