const INITIAL_STATE = {
  user: null,
  buttonLoader: false,
  isLoading: true,
  errorMessage: null,
  token: localStorage.getItem("token"),
  success: false,
  usersList: [],
  deleteSuccess: false,
  userDetails: null,
  successUpdate: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_LOADER":
      return {
        ...state,
        isLoading: true,
        deleteSuccess: false,
        successUpdate: false,
      };

    case "BUTTON_LOADER":
      return {
        ...state,
        buttonLoader: true,
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
        buttonLoader: false,
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
        // user: null,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
        success: false,
        buttonLoader: false,
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
        buttonLoader: false,
      };

    case "USER_LIST_UPDATE":
      // const newList = state.usersList.filter((user) => user._id !== action.payload.id);
      return {
        ...state,
        isLoading: false,
        // usersList: newList,
        deleteSuccess: true,
      };

    case "USER_LIST_FAIL":
      return {
        ...state,
        isLoading: false,
        deleteSuccess: false,
        errorMessage: action.payload.errorMessage,
      };
    case "USER_LIST_RESET":
      return {
        ...state,
        usersList: [],
      };

    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: null,
      };

    case "USER_DETAIL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        userDetails: action.payload.userDetails,
      };
    case "USER_DETAIL_FAIL":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    case "USER_DETAIL_RESET":
      return {
        ...state,
        userDetails: null,
        successUpdate: false,
      };

    case "USER_DETAIL_UPDATE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        userDetails: action.payload.userDetails,
        successUpdate: true,
        buttonLoader: false,
      };

    case "USER_DETAIL_UPDATE_FAIL":
      return {
        ...state,
        isLoading: false,
        userDetails: null,
        buttonLoader: false,
        successUpdate: false,
      };

    default:
      return { ...state };
  }
};

export default userReducer;
