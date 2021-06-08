import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import { activityReducer, IActivityState } from "./activity/reducer";
import { userReducer, IUserState } from "./user/reducer";
import ActivityApi from "./_api/activityApi";
import UserApi from "./_api/userApi";
import CalendarApi from "./_api/calendarApi";
import activityEpic from "./activity/epic";
import eventEpic from "./event/epic";
import userEpic from "./user/epic";
import { AppAction } from "./_types/action";
import { eventReducer, IEventState } from "./event/reducer";

export interface IAppState {
  activity: IActivityState;
  user: IUserState;
  event: IEventState;
}

export interface IAppDependencies {
  activityApi: ActivityApi;
  userApi: UserApi;
  calendarApi: CalendarApi;
}

export const rootReducer = combineReducers<IAppState>({
  activity: activityReducer,
  user: userReducer,
  event: eventReducer,
});

export const configureStore = (
  dependencies: IAppDependencies
): Store<IAppState> => {
  const epicMiddleware = createEpicMiddleware<
    AppAction<any>,
    AppAction<any>,
    IAppState,
    IAppDependencies
  >({ dependencies });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  const rootEpic = combineEpics<
    AppAction<any>,
    AppAction<any>,
    IAppState,
    IAppDependencies
  >(activityEpic, userEpic, eventEpic);

  epicMiddleware.run(rootEpic);

  return store;
};

export * from "./_enum/Routes";
