import { useSelector } from "react-redux";
import { IAppState } from "..";
import { IActivityResponse } from "../_types/activityResponse";
import { ISubscriptionResponse } from "../_types/subscriptionResponse";

export const useConnectedUser = (activity: IActivityResponse) => {
    const { connectedUser, subscriptions } = useSelector<IAppState, any>(
      ({ user, event }) => ({
        connectedUser: user.user,
        subscriptions: Object.values(event.subscriptionList),
      })
    );

    if (connectedUser) {
      const userSubscribe = subscriptions.filter(
        (sub: ISubscriptionResponse) =>
          sub.userId === connectedUser.id && sub.activityId === activity.id
      );
      return {
        user: connectedUser,
        hasSubscribed: userSubscribe.length > 0,
      };
    }
  };