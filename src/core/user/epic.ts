import { combineEpics, Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { IAppDependencies, IAppState } from '..';
import { AppAction } from '../_types/action';
import {
  fetchUserError,
  fetchUserSuccess,
  postCredentialsError,
  postCredentialsSuccess,
  postUserError,
  postUserSuccess,
  UserActions,
} from './actions';

export type UserEpic = Epic<
  AppAction<UserActions>,
  AppAction<UserActions>,
  IAppState,
  IAppDependencies
>;

export const userLoginEpic: UserEpic = (action$, state, { userApi }) =>
  action$.pipe(
    ofType(UserActions.POST_CREDENTIALS_PENDING),
    switchMap(({ payload }) => userApi.login(payload)),
    tap(payload => {
      if (payload.token) {
        localStorage.setItem('TOKEN', payload.token);
      }
    }),
    map(postCredentialsSuccess),
    catchError(err => {
      localStorage.removeItem('TOKEN');
      return of(postCredentialsError(err));
    }),
  );

export const getUserEpic: UserEpic = (action$, state, { userApi }) =>
  action$.pipe(
    ofType(UserActions.FETCH_USER_PENDING),
    switchMap(() => userApi.getUserBytoken()),
    map(fetchUserSuccess),
    catchError(err => {
      localStorage.removeItem('TOKEN');
      return of(fetchUserError(err));
    }),
  );

export const createUserEpic: UserEpic = (action$, state, { userApi }) =>
  action$.pipe(
    ofType(UserActions.POST_USER_PENDING),
    switchMap(({ payload }) => userApi.createUser(payload)),
    tap(payload => {
      localStorage.setItem('TOKEN', payload.token);
    }),
    map(postUserSuccess),
    catchError(err => {
      localStorage.removeItem('TOKEN');
      return of(postUserError(err));
    }),
  );

export default combineEpics(userLoginEpic, getUserEpic, createUserEpic);
