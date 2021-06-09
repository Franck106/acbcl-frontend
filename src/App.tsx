import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";

import HomePage from "./pages/home";
import Sidebar from "./components/sidebar";
import ActivityApi from "./core/_api/activityApi";
import CalendarApi from "./core/_api/calendarApi";
import UserApi from "./core/_api/userApi";
import { configureStore } from "./core/index";
import { Routes } from "./core/_enum/Routes";
import ActivityManagePage from "./pages/activity-manage";
import RouteWrapper from "./components/route-wrapper";
import AppFooter from "./components/footer";
import CalendarPublicPage from "./pages/calendar-public";
import ActivitySchedulePage from "./pages/activity-schedule";
import AboutPage from "./pages/about";
import ActivityInfoPage from "./pages/activity-info";

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
    minHeight: "60vh",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2, 0, 1),
    marginTop: theme.spacing(4),
    backgroundColor: "#000000",
    color: theme.palette.text.secondary,
  },
}));

const activityApi = new ActivityApi();
const userApi = new UserApi();
const calendarApi = new CalendarApi();

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Provider store={configureStore({ activityApi, userApi, calendarApi })}>
          <div className={classes.header}>
            <Sidebar />
          </div>
          <Container component="main" className={classes.main}>
            <RouteWrapper exact path={Routes.HOME} component={HomePage} />
            <RouteWrapper path={Routes.ABOUT} component={AboutPage} />
            <RouteWrapper
              path={Routes.ADMIN_ACTIVITY}
              component={ActivityManagePage}
            />
            <RouteWrapper
              path={Routes.CALENDAR}
              component={CalendarPublicPage}
            />
            <RouteWrapper
              path={Routes.ACTIVITY_INFO}
              component={ActivityInfoPage}
            />
            <RouteWrapper
              path={Routes.ADMIN_ACTIVITY_SCHEDULE}
              component={ActivitySchedulePage}
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
