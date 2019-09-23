const image = (state = '', action) => {
  switch (action.type) {
    case 'SET_URI':
      return action.payload
    default:
      return state;
  }
}

export default image