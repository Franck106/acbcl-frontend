import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Provider } from "react-redux";

import HomePage from "./pages/home";
import SubscriptionPage from "./pages/subscription";
import Sidebar from "./components/sidebar";
import ActivitiesPage from "./pages/activities";
import ActivityApi from "./core/_api/activityApi";
import { configureStore } from "./core/index";
import { Routes } from './core/_enum/Routes';

const activityApi = new ActivityApi();

function App() {
  return (
    <BrowserRouter>
        <Container>
      <Provider store={configureStore({ activityApi })}>
          <Sidebar />
          <Route exact path={Routes.HOME} component={HomePage} />
          <Route path={Routes.SUBSCRIPTION} component={SubscriptionPage} />
          <Route path={Routes.ACTIVITIES} component={ActivitiesPage} />
      </Provider>
        </Container>
    </BrowserRouter>
  );
}

export default App;
