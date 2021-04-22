const INITIAL_STATE = {
  order: null,
  isLoading: false,
  errorMessage: "",
  success: false,
};

const placeOrderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return {
        ...state,
        success: false,
        isLoading: true,
        errorMessage: "",
      };
    case "ORDER_CREATE_SUCCESS":
      return {
        ...state,
        success: true,
        isLoading: false,
        order: action.payload.data,
      };
    case "ORDER_CREATE_FAILED":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.msg,
      };

    case "ORDER_CREATE_RESET":
      return {
        order: null,
        isLoading: false,
        errorMessage: "",
        success: false,
      };
    default:
      return { ...state };
  }
};

export default placeOrderReducer;
