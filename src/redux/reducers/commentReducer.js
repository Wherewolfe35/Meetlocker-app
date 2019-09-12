import { combineReducers } from "redux";

//stores text from new comment on the CampLog, clears upon comment being added to database
const currentComment = (state = '', action) => {
  switch (action.type) {
    case 'CURRENT_COMMENT':
      return action.payload;
    case 'ADD_COMMENT':
      return ''
    default:
      return state;
  }
}
// stores list of comments for one particular log from the database
const commentList = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  currentComment,
  commentList,
});