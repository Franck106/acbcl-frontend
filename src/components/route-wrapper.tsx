import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { IAppState, Routes } from "../core";
import { fetchUser } from "../core/user/actions";
import { IUserResponse } from "../core/_types/userResponse";

interface RouterWrapperProps {
  path: string;
  component: React.FC;
  exact?: boolean;
}

const RouteWrapper: React.FC<RouterWrapperProps> = ({
  path,
  component,
  exact,
}) => {
  const dispatch = useDispatch();
  const user = useSelector<IAppState, IUserResponse | undefined>(
    ({ user }) => user.user
  );
  const token = localStorage.getItem("TOKEN");

  const error = useSelector<IAppState, string | null>(({ user }) => user.error);

  if (!user && token) {
    dispatch(fetchUser());
  }

  if (error) {
    return <Redirect to={Routes.HOME} />;
  }

  return <Route exact path={path} component={component} />;
};

export default RouteWrapper;
