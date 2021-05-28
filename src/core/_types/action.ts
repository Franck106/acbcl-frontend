import { Action, ActionCreator } from "redux";

export interface AppAction<A = any, P = any> extends Action<A> {
  payload?: P;
}

export type AppActionCreator<A = any, P = any> = ActionCreator<AppAction<A, P>>;
