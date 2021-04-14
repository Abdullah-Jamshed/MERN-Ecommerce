const INITIAL_STATE = {
  user: null,
  isLoading: false,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        ...state,
        isLoading: true,
      };

    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
      };
    case "USER_LOGIN_FAIL":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    case "USER_LOGIN_LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return { ...state };
  }
};

export default productReducer;
