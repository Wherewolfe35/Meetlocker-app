import { combineReducers } from 'redux';

//stores list of events from the database
const eventList = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.payload;
    default:
      return state;
  }
}
//stores text, start date, and end date for a new event, clears when new event is added to database
const currentEvent = (state = '', action) => {
  switch (action.type) {
    case 'START_EVENT':
      return {...state, startDate: action.payload};
    case 'END_EVENT':
      return { ...state, endDate: action.payload };
    case 'EVENT_TITLE':
      return { ...state, title: action.payload };
    case 'EVENT_ADDED':
      return '';
    default:
      return state;
  }
}


export default combineReducers({
  eventList,
  currentEvent,
});