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
      return {...state, text:action.payload};
    case 'LOG_DATE':
      return {...state, date: action.payload}
    default:
      return state;
  }
}

const currentComment = (state = '', action) => {
  switch (action.type) {
    case 'CURRENT_COMMENT':
      return action.payload;
    default:
      return state;
  }
}


export default combineReducers({
  currentLog,
  logList,
  currentComment,
});