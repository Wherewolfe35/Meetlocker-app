import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import events from "./eventReducer";
import log from "./logReducer";
import comment from "./commentReducer"
import leaderboard from "./leaderboardReducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  events, //contains calendar list of events
  log, // contains a list of all logs as well as the current log
  comment, // contains the comments for a specific log as well as a new comment
  leaderboard, //contains the animals data for all users
});

export default rootReducer;
