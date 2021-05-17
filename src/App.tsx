import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import HomePage from "./pages/home";
import { Routes } from './core/_enum/Routes';
import SubscriptionPage from "./pages/subscription";
import Sidebar from "./components/sidebar";
import ActivitiesPage from "./pages/activities";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Sidebar/>
        <Route exact path={Routes.HOME} component={HomePage} />
        <Route path={Routes.SUBSCRIPTION} component={SubscriptionPage} />
        <Route path={Routes.ACTIVITIES} component={ActivitiesPage} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
