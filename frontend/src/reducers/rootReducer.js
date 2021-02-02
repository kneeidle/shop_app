const initState = {
  posts: 0,
  auth: false,
  admin: false,
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
      case 'ADMIN':
        return {
          ...state,
          admin: action.admin,
        };
    default:
      return state;
  }
};

export default rootReducer;
