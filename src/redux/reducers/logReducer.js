import { combineReducers } from "redux";

//stores logs from the database
const logList = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOG':
      return action.payload;
    default:
      return state;
  }
}
//stores new log text and date from the campLog component
const currentLog = (state = '', action) => {
  switch (action.type) {
    case 'CURRENT_LOG':
      return {...state, text:action.payload};
    case 'LOG_DATE':
      return {...state, date: action.payload}
    case 'CLEAR_LOG':
      return {text: '', date: ''};
    default:
      return state;
  }
}

export default combineReducers({
  currentLog,
  logList,
});