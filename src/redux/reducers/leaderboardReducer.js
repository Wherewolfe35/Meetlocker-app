import { combineReducers } from "redux";

const userList = (state=[], action) => {
  switch (action.type) {
    case 'SET_LEADERBOARD_USERS':
      return action.payload;
    default:
      return state;
  };
}

const animalList = (state=[], action) => {
  switch (action.type) {
    case 'SET_ANIMALS':
      return action.payload
    default:
      return state;
  }
}

export default combineReducers({
  userList, // contains the list of users
  animalList, // contains list of animals
});