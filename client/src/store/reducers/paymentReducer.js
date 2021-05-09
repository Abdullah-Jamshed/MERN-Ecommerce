const INITIAL_STATE = {
  paymentMethod: localStorage.getItem("payment_method") || null,
  successPay: false,
  isLoading: false,
};

const paymentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload.method,
      };

    case "ORDER_PAY_REQUEST":
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
      };

    case "ORDER_PAY_SUCCESS":
      return {
        ...state,
        successPay: true,
        isLoading: false,
      };
    case "ORDER_PAY_FAILED":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    case "ORDER_PAY_RESET":
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        successPay: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default paymentReducer;
