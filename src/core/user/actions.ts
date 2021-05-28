import { AppActionCreator } from "../_types/action";
import { ICredentials } from "../_types/credentials";
import { IUserCreate } from "../_types/userCreate";
import { IUserResponse } from "../_types/userResponse";

export enum UserActions {
  "POST_CREDENTIALS_PENDING" = "user/postCredentialsPending",
  "POST_CREDENTIALS_SUCCESS" = "user/postCredentialsSuccess",
  "POST_CREDENTIALS_ERROR" = "user/postCredentialsError",
  "FETCH_USER_PENDING" = "user/fetchUserPending",
  "FETCH_USER_SUCCESS" = "user/fetchUserSuccess",
  "FETCH_USER_ERROR" = "user/fetchUserError",
  "POST_USER_PENDING" = "user/postUserPending",
  "POST_USER_SUCCESS" = "user/postUserSuccess",
  "POST_USER_ERROR" = "user/postUserError",
  "USER_SIGNOUT" = "user/userSignout",
  "CLEAR_ERROR" = "user/clearError",
}

export const postCredentials: AppActionCreator<UserActions, ICredentials> = (
  payload: ICredentials
) => ({
  type: UserActions.POST_CREDENTIALS_PENDING,
  payload,
});

export const postCredentialsSuccess: AppActionCreator<UserActions, any> = (
  payload: any
) => ({
  type: UserActions.POST_CREDENTIALS_SUCCESS,
  payload,
});

export const postCredentialsError: AppActionCreator<UserActions, Error> = (
  payload: Error
) => ({
  type: UserActions.POST_CREDENTIALS_ERROR,
  payload,
});

export const fetchUser: AppActionCreator<UserActions> = () => ({
  type: UserActions.FETCH_USER_PENDING,
});

export const fetchUserSuccess: AppActionCreator<UserActions, IUserResponse> = (
  payload: IUserResponse
) => ({
  type: UserActions.FETCH_USER_SUCCESS,
  payload,
});

export const fetchUserError: AppActionCreator<UserActions, Error> = (
  payload: Error
) => ({
  type: UserActions.FETCH_USER_ERROR,
  payload,
});

export const postUser: AppActionCreator<UserActions, IUserCreate> = (
  payload: IUserCreate
) => ({
  type: UserActions.POST_USER_PENDING,
  payload,
});

export const postUserSuccess: AppActionCreator<UserActions, any> = (
  payload: any
) => ({
  type: UserActions.POST_USER_SUCCESS,
  payload,
});

export const postUserError: AppActionCreator<UserActions, Error> = (
  payload: Error
) => ({
  type: UserActions.POST_USER_ERROR,
  payload,
});

export const userSignout: AppActionCreator<UserActions> = () => ({
  type: UserActions.USER_SIGNOUT,
});

export const clearError: AppActionCreator<UserActions> = () => ({
  type: UserActions.CLEAR_ERROR,
});
