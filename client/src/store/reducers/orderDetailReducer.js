const INITIAL_STATE = {
  order: null,
  // orderItems: [], // extra
  // shippingAdress: null, // extra
  isLoading: false,
  errorMessage: "",
  success: false,
  listLoader: false,
  ordersList: [],
};

const orderDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ORDER_DETAIL_REQUEST":
      return {
        ...state,
        success: false,
        isLoading: true,
        errorMessage: "",
      };
    case "ORDER_DETAIL_SUCCESS":
      return {
        ...state,
        success: true,
        isLoading: false,
        order: action.payload.data,
      };
    case "ORDER_DETAIL_FAILED":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };

    case "MY_ORDER_LIST_REQUEST":
      return {
        ...state,
        listLoader: true,
        errorMessage: "",
      };
    case "MY_ORDER_LIST_SUCCESS":
      return {
        ...state,
        listLoader: false,
        ordersList: action.payload.data,
      };

    case "MY_ORDER_LIST_FAILED":
      return {
        ...state,
        listLoader: false,
        errorMessage: action.payload.errorMessage,
      };
    case "MY_ORDER_LIST_RESET":
      return {
        ...state,
        listLoader: false,
        ordersList: [],
      };
    default:
      return { ...state };
  }
};

export default orderDetailReducer;
