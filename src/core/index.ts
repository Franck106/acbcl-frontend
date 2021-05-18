import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import { activityReducer, IActivityState } from "./activity/reducer";
import ActivityApi from "./_api/activityApi";
import { AppAction } from "./_types/action";
import activityEpic from "./activity/epic";

export interface IAppState {
  activity: IActivityState;
}

export interface IAppDependencies {
  activityApi: ActivityApi;
}

export const rootReducer = combineReducers<IAppState>({
  activity: activityReducer,
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
    >(activityEpic);

  epicMiddleware.run(rootEpic);

  return store;
};

export * from "./_enum/Routes";
