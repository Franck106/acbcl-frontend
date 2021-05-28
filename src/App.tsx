import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";

import HomePage from "./pages/home";
import SubscriptionPage from "./pages/subscription";
import Sidebar from "./components/sidebar";
import ActivitiesPage from "./pages/activities";
import ActivityApi from "./core/_api/activityApi";
import UserApi from "./core/_api/userApi";
import { configureStore } from "./core/index";
import { Routes } from "./core/_enum/Routes";
import ActivityCreatePage from "./pages/activity-create";
import RouteWrapper from "./components/route-wrapper";
import AppFooter from "./components/footer";
import ActivitiesCalendarPage from "./pages/activities-calendar";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    marginBottom: theme.spacing(0),
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: "#000000",
    color: theme.palette.text.secondary,
  },
}));

const activityApi = new ActivityApi();
const userApi = new UserApi();

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Provider store={configureStore({ activityApi, userApi })}>
          <div className={classes.header}>
            <Sidebar />
          </div>
          <Container component="main" className={classes.main}>
            <RouteWrapper exact path={Routes.HOME} component={HomePage} />
            <RouteWrapper
              path={Routes.SUBSCRIPTION}
              component={SubscriptionPage}
            />
            <RouteWrapper path={Routes.ACTIVITIES} component={ActivitiesPage} />
            <RouteWrapper
              path={Routes.ADMIN_ACTIVITY}
              component={ActivityCreatePage}
            />
            <RouteWrapper
              path={Routes.CALENDAR}
              component={ActivitiesCalendarPage}
            />
          </Container>
        </Provider>
        <footer className={classes.footer}>
          <AppFooter />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
