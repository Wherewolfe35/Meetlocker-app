import { combineReducers } from "redux";

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