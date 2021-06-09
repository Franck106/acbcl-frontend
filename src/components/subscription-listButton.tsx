import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "../core";
import { IActivityResponse } from "../core/_types/activityResponse";
import { ISubscriptionResponse } from "../core/_types/subscriptionResponse";
import SubscriptionList from "./subscription-list";

interface SubscriptionListButtonProps {
  activity: IActivityResponse;
}

const SubscriptionListButton: React.FC<SubscriptionListButtonProps> = ({
  activity,
}) => {
  const [openSubscriptions, setOpenSubscriptions] = useState(false);
  const handleSubscriptionsClose = () => {
    setOpenSubscriptions(false);
  };

  const activitySubscriptions = useSelector<IAppState, ISubscriptionResponse[]>(
    ({ event }) =>
      Object.values(event.subscriptionList).filter(
        (sub) => sub.activityId === activity.id
      )
  );

  const showActivitySubscriptions = () => {
    setOpenSubscriptions(true);
  };
  return (
    <>
      <Button
        value={activity.id}
        onClick={showActivitySubscriptions}
        disabled={activitySubscriptions.length === 0}
      >
        {activitySubscriptions.length + " inscription(s)"}
      </Button>
      {activitySubscriptions && (
        <Dialog
          open={openSubscriptions}
          onClose={handleSubscriptionsClose}
          aria-labelledby="validate-dialog"
        >
          <DialogTitle id="validate-dialog">
            Valider les inscriptions
          </DialogTitle>
          <DialogContent>
            <SubscriptionList
              subscriptions={activitySubscriptions}
              onFinish={handleSubscriptionsClose}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SubscriptionListButton;
