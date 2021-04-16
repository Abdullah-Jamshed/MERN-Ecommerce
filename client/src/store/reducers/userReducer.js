const INITIAL_STATE = {
  user: null,
  isLoading: false,
  errorMessage: null,
  token: localStorage.getItem("token"),
  success: false,
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
    case "USER_UPDATE_SUCCESS":
    case "USER_LOADED":
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        user: action.payload.user,
        success: action.payload.success || false,
      };

    case "USER_LOAD_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
      };
    case "USER_SIGNUP_FAIL":
    case "USER_LOGIN_FAIL":
    case "USER_UPDATE_FAIL":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
        success: false,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: null,
      };

    default:
      return { ...state };
  }
};

export default userReducer;
