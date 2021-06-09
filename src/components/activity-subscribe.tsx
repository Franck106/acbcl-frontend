import React from "react";
import { useDispatch } from "react-redux";
import "date-fns";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { IActivityResponse } from "../core/_types/activityResponse";
import { IUserResponse } from "../core/_types/userResponse";
import { sendSubscription } from "../core/event/actions";
import { ISubscriptionCreate } from "../core/_types/subscriptionCreate";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

interface ActivitySubscribeUserProps {
  connectedUser: {
    user: IUserResponse;
    hasSubscribed: boolean;
  }
  activity: IActivityResponse;
  onFinish: () => void;
}

const ActivitySubscribe: React.FC<ActivitySubscribeUserProps> = ({
  connectedUser,
  activity,
  onFinish,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const subscription: ISubscriptionCreate = {
      activityId: activity.id,
      userId: connectedUser.user.id,
    };
    dispatch(sendSubscription(subscription));
    onFinish();
  };

  return (
    <div className={classes.paper}>
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell component="th" scope="row">
              Prix :
            </TableCell>
            <TableCell>{activity.price}€</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Lieu :
            </TableCell>
            <TableCell>{activity.place}</TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <Button
        type="button"
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        S'inscrire
      </Button>
    </div>
  );
};

export default ActivitySubscribe;
