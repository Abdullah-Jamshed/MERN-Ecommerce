const INITIAL_STATE = {
  paymentMethod: localStorage.getItem("payment_method") || null,
};

const paymentReducer = (state = INITIAL_STATE, action) => {
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

export default paymentReducer;
