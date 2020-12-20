const initState = {
  posts: 0,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'DELETE_POST':
      return {
        ...state,
        posts: action.id,
      };

    default:
      return state;
  }
};

export default rootReducer;
