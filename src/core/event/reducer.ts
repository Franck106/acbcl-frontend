import { Reducer } from "redux";
import { Status } from "../_enum/Status";
import { AppAction } from "../_types/action";
import { IEventResponse } from "../_types/eventResponse";
import { IGuestResponse } from "../_types/guestResponse";
import { ISubscriptionResponse } from "../_types/subscriptionResponse";
import { EventActions } from "./actions";

export interface IEventState {
  list: Record<string, IEventResponse>;
  status: Status;
  error: string | null;
  stash?: any;
  subscriptionList: Record<string, ISubscriptionResponse>;
  guestList: Record<string, IGuestResponse>;
}

const initialState = {
  list: {},
  status: Status.IDLE,
  error: null,
  subscriptionList: {},
  guestList: {},
};

export const eventReducer: Reducer<IEventState, AppAction<EventActions>> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case EventActions.CREATE_EVENT_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case EventActions.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        error: null,
        list: {
          ...state.list,
          [action.payload.id]: action.payload,
        },
      };
    case EventActions.CREATE_EVENT_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
      };

    case EventActions.DELETE_EVENT_PENDING:
      return {
        ...state,
        status: Status.PENDING,
        stash: state.list[action.payload],
        list: Object.entries(state.list)
          .filter(([_, evt]) => evt.id !== action.payload)
          .reduce(
            (acc, [key, evt]) => ({
              ...acc,
              [key]: evt,
            }),
            {}
          ),
      };
    case EventActions.DELETE_EVENT_SUCCESS:
      return {
        list: state.list,
        status: Status.COMPLETED,
        error: null,
        subscriptionList: state.subscriptionList,
        guestList: state.guestList,
      };
    case EventActions.DELETE_EVENT_ERROR:
      return {
        list: {
          ...state.list,
          [state.stash.id]: state.stash,
        },
        status: Status.FAILED,
        error: action.payload.message,
        subscriptionList: state.subscriptionList,
        guestList: state.guestList,
      };

    case EventActions.CREATE_SINGLE_EVENT_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case EventActions.CREATE_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        list: {
          ...state.list,
          [action.payload.id]: action.payload,
        },
      };
    case EventActions.CREATE_SINGLE_EVENT_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
      };

    case EventActions.DELETE_SINGLE_EVENT_PENDING:
      return {
        ...state,
        status: Status.PENDING,
        stash: state.list[action.payload],
        list: Object.entries(state.list)
          .filter(([_, evt]) => evt.id !== action.payload)
          .reduce(
            (acc, [key, evt]) => ({
              ...acc,
              [key]: evt,
            }),
            {}
          ),
      };
    case EventActions.DELETE_SINGLE_EVENT_SUCCESS:
      return {
        list: state.list,
        status: Status.COMPLETED,
        error: null,
        subscriptionList: state.subscriptionList,
        guestList: state.guestList,
      };
    case EventActions.DELETE_SINGLE_EVENT_ERROR:
      return {
        status: Status.FAILED,
        error: action.payload.message,
        list: {
          ...state.list,
          [state.stash.id]: state.stash,
        },
        subscriptionList: state.subscriptionList,
        guestList: state.guestList,
      };

    case EventActions.FETCH_EVENTS_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case EventActions.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        list: action.payload.reduce(
          (acc: any, event: IEventResponse) => ({
            ...acc,
            [event.id]: event,
          }),
          {}
        ),
      };
    case EventActions.FETCH_EVENTS_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
      };

    case EventActions.SEND_SUBSCRIPTION_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case EventActions.SEND_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        subscriptionList: {
          ...state.subscriptionList,
          [action.payload.id]: action.payload,
        },
      };
    case EventActions.SEND_SUBSCRIPTION_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
      };

      case EventActions.DELETE_SUBSCRIPTION_PENDING:
      return {
        ...state,
        status: Status.PENDING,
        stash: state.subscriptionList[action.payload],
        subscriptionList: Object.entries(state.subscriptionList)
          .filter(([_, sub]) => sub.id !== action.payload)
          .reduce(
            (acc, [key, sub]) => ({
              ...acc,
              [key]: sub,
            }),
            {}
          ),
      };
    case EventActions.DELETE_SUBSCRIPTION_SUCCESS:
      return {
        list: state.list,
        status: Status.COMPLETED,
        error: null,
        subscriptionList: state.subscriptionList,
        guestList: state.guestList,
      };
    case EventActions.DELETE_SUBSCRIPTION_ERROR:
      return {
        subscriptionList: {
          ...state.subscriptionList,
          [state.stash.id]: state.stash,
        },
        status: Status.FAILED,
        error: action.payload.message,
        list: state.list,
        guestList: state.guestList,
      };

    case EventActions.CREATE_GUEST_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case EventActions.CREATE_GUEST_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        error: null,
        guestList: {
          ...state.guestList,
          [action.payload.id]: action.payload,
        },
      };
    case EventActions.CREATE_GUEST_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
      };

    case EventActions.FETCH_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case EventActions.FETCH_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        subscriptionList: action.payload.reduce(
          (acc: any, sub: ISubscriptionResponse) => ({
            ...acc,
            [sub.id]: sub,
          }),
          {}
        ),
      };
    case EventActions.FETCH_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
      };

    case EventActions.VALIDATE_SUBSCRIPTION_PENDING:
      return {
        ...state,
        status: Status.PENDING,
        stash: state.subscriptionList[action.payload],
        subscriptionList: Object.entries(state.subscriptionList)
          .filter(([_, sub]) => sub.id !== action.payload)
          .reduce(
            (acc: any, [key, sub]) => ({
              ...acc,
              [key]: sub,
            }),
            {}
          ),
      };
    case EventActions.VALIDATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        status: Status.COMPLETED,
        list: action.payload.reduce(
          (acc: any, event: IEventResponse) => ({
            ...acc,
            [event.id]: event,
          }),
          { ...state.list }
        ),
        stash: {},
      };
    case EventActions.VALIDATE_SUBSCRIPTION_ERROR:
      return {
        ...state,
        status: Status.FAILED,
        error: action.payload.message,
        subscriptionList: {
          ...state.subscriptionList,
          [state.stash.id]: state.stash,
        }
      };
    default:
      return state;
  }
};
