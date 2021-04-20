const INITIAL_STATE = {
  paymentMethod: localStorage.getItem("payment_method") || null,
};

const shippingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload.method,
      };
    default:
      return {
        ...state,
      };
  }
};

export default shippingReducer;
