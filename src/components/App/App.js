import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import './App.css';
import AboutPage from '../AboutPage/AboutPage';
import Calendar from '../Calendar/Calendar';
import InfoPage from '../InfoPage/InfoPage';
import Nav from '../Nav/Nav';
import CampLog from '../CampLog/CampLog';
import Admin from '../Admin/Admin';
import Leaderboard from '../Leaderboard/Leaderboard';
import EventForm from "../EventForm/EventForm";
import AnimalForm from '../AnimalForm/AnimalForm';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#05630d'
    },
    secondary: {
      main: '#FF6700'
    },
  }
})

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/Calendar" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/Calendar"
                component={Calendar}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              <ProtectedRoute
                exact
                path="/info"
                component={InfoPage}
              />
              <ProtectedRoute
                exact
                path="/CampLog"
                component={CampLog}
              />
              <ProtectedRoute
                exact
                path="/nav"
                component={Nav}
              />
              <ProtectedRoute
                exact
                path="/Admin"
                component={Admin}
              />
              <ProtectedRoute
                exact
                path="/Leaderboard"
                component={Leaderboard}
              />
              <ProtectedRoute
                exact
                path="/EventForm"
                component={EventForm}
              />
              <ProtectedRoute
                exact
                path="/AddAnimal"
                component={AnimalForm}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default connect()(App);
