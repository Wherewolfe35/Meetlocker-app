import { combineReducers } from "redux";

const userList = (state = [], action) => {
  switch (action.type) {
    case 'SET_ADMIN_USER':
      return action.payload;
    default:
      return state
  }
}

const trophyList = (state = [], action) => {
  switch (action.type) {
    case 'SET_ADMIN_TROPHY':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  userList,
  trophyList
});