const initState = {
  posts: 0,
  auth: false,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'DELETE_POST':
      return {
        ...state,
        posts: action.id,
      };
    case 'AUTH':
      return {
        ...state,
        auth: action.auth,
      };
    default:
      return state;
  }
};

export default rootReducer;
