const INITIAL_STATE = {
  user: null,
  isLoading: false,
  errorMessage: null,
  token: localStorage.getItem("token"),
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_LOADER":
      return {
        ...state,
        isLoading: true,
      };

    case "USER_SIGNUP_SUCCESS":
    case "USER_LOGIN_SUCCESS":
    case "USER_LOADED":
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        user: action.payload.user,
      };

    case "USER_LOAD_FAIL":
    case "USER_SIGNUP_FAIL":
    case "USER_LOGIN_FAIL":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return { ...state };
  }
};

export default userReducer;
