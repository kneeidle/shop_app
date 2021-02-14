const initState = {
  product: 0,
  auth: false,
  admin: false,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PRODUCT_COUNTER':
      return {
        ...state,
        product: action.id,
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
