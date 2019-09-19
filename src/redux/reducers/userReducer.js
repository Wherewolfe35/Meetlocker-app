const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'SET_USER_TROPHIES':
      return {...state, trophyData: action.payload};
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
