import { combineReducers } from "redux";

const logList = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOG':
      return action.payload;
    default:
      return state;
  }
}

const currentLog = (state = '', action) => {
  switch (action.type) {
    case 'CURRENT_LOG':
      return action.payload;
    default:
      return state;
  }
}


export default combineReducers({
  currentLog,
  logList,
});