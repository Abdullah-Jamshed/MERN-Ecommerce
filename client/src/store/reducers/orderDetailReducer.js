const INITIAL_STATE = {
  order: null,
  isLoading: false,
  errorMessage: "",
  success: false,
  listLoader: false,
  orders: [],
  myOrders: [],
  succesDeliver: false,
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
        myOrders: action.payload.data,
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
        myOrders: [],
      };

    case "ORDER_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };
    case "ORDER_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        orders: action.payload.data,
      };

    case "ORDER_LIST_FAILED":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    case "ORDER_LIST_RESET":
      return {
        ...state,
        isLoading: false,
        orders: [],
      };
    case "ORDER_CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: "",
      };

    case "ORDER_DELIVERY_STATUS_REQUEST":
      return {
        ...state,
        errorMessage: "",
      };
    case "ORDER_DELIVERY_STATUS_SUCCESS":
      return {
        ...state,
        succesDeliver: true,
      };

    case "ORDER_DELIVERY_STATUS_FAILED":
      return {
        ...state,
        succesDeliver: false,
        errorMessage: action.payload.errorMessage,
      };
    case "ORDER_DELIVERY_STATUS_RESET":
      return {
        ...state,
        succesDeliver: false,
        errorMessage: "",
      };

    default:
      return { ...state };
  }
};

export default orderDetailReducer;
