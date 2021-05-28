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
import activityEpic from "./activity/epic";
import userEpic from "./user/epic";
import { AppAction } from "./_types/action";

export interface IAppState {
  activity: IActivityState;
  user: IUserState;
}

export interface IAppDependencies {
  activityApi: ActivityApi;
  userApi: UserApi;
}

export const rootReducer = combineReducers<IAppState>({
  activity: activityReducer,
  user: userReducer,
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
  >(activityEpic, userEpic);

  epicMiddleware.run(rootEpic);

  return store;
};

export * from "./_enum/Routes";
