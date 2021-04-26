const INITIAL_STATE = {
  user: null,
  isLoading: false,
  errorMessage: null,
  token: localStorage.getItem("token"),
  success: false,
  usersList: [],
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
    case "USER_LOADED_SUCCESS":
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        user: action.payload.user,
        success: action.payload.success || false,
        token: action.payload.user.token || localStorage.getItem("token"),
      };

    case "USER_LOAD_FAIL":
      localStorage.removeItem("token");
      console.log("USER_LOAD_FAIL");
      return {
        ...state,
        isLoading: false,
      };
    case "USER_SIGNUP_FAIL":
    case "USER_LOGIN_FAIL":
    case "USER_UPDATE_FAIL":
      return {
        ...state,
        // user: null,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
        success: false,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };

    case "USER_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
      };

    case "USER_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        usersList: action.payload.users,
      };

    case "USER_LIST_UPDATE":
      console.log(action.payload.id)
      const newList = state.usersList.filter((user) => user._id !== action.payload.id);
      return {
        ...state,
        isLoading: false,
        usersList: newList,
      };

    case "USER_LIST_FAIL":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
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
