const INITIAL_STATE = {
  orderItems: [],
  shippingAdress: null,
  isLoading: false,
  errorMessage: "",
  success: false,
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
        orderItems: action.payload.data ,
      };
    case "ORDER_DETAIL_FAIL":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.msg,
      };

    default:
      return { ...state };
  }
};

export default orderDetailReducer;
