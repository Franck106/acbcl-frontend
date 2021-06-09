import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import { ISubscriptionResponse } from "../core/_types/subscriptionResponse";
import { IAppState } from "../core";
import { IUserResponse } from "../core/_types/userResponse";
import { fetchAllUsers } from "../core/user/actions";
import { deleteSubscription, validateSubscription } from "../core/event/actions";

interface SubscriptionListProps {
  subscriptions: ISubscriptionResponse[];
  onFinish: () => void;
}

interface SubscriptionWithUser extends ISubscriptionResponse {
  candidate: {
    id: string;
    firstname: string;
    lastname: string;
  };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    minWidth: 300,
  },
});

const SubscriptionList: React.FC<SubscriptionListProps> = ({
  subscriptions,
  onFinish,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
    // eslint-disable-next-line
  }, [dispatch]);

  const subscriptionsWithUser = useSelector<IAppState, SubscriptionWithUser[]>(
    ({ user }) =>
      subscriptions.map((subscription) => {
        const userSuscribe = Object.values(user.list).find(
          (u) => u.id === subscription.userId
        ) as IUserResponse;
        return {
          ...subscription,
          candidate: {
            id: userSuscribe?.id,
            firstname: userSuscribe?.firstName,
            lastname: userSuscribe?.lastName,
          },
        };
      })
  );

  if (!subscriptionsWithUser) {
    return <CircularProgress color="secondary" />;
  }

  const handleValidate = (e: any) => {
    dispatch(validateSubscription(e.currentTarget.value));
    onFinish();
  };

  const handleRemove = (e: any) => {
    dispatch(deleteSubscription(e.currentTarget.value));
    onFinish();
  };

  return (
    <List component="div" className={classes.root}>
      {subscriptionsWithUser.map((subscription) => (
        <ListItem key={subscription.id}>
          <ListItemText
            primary={
              subscription.candidate.firstname +
              " " +
              subscription.candidate.lastname
            }
          />
          <ListItemSecondaryAction>
            <Button
              value={subscription.id}
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleValidate}
            >
              Valider
            </Button>
            <IconButton
                value={subscription.id}
                onClick={handleRemove}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default SubscriptionList;
