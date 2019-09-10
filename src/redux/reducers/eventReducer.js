import { combineReducers } from 'redux';

const eventList = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.payload;
    default:
      return state;
  }
}

const currentEvent = (state = '', action) => {
  switch (action.type) {
    case 'START_EVENT':
      return {...state, startDate: action.payload}
    case 'END_EVENT':
      return { ...state, endDate: action.payload }
    case 'EVENT_TITLE':
      return { ...state, title: action.payload }
    default:
      return state;
  }
}


export default combineReducers({
  eventList,
  currentEvent,
});