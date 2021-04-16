const INITIAL_STATE = {
  shippingAddress: JSON.parse(localStorage.getItem("shipping_address")) || null,
};

const shippingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload.shippingAddress,
      };
    default:
      return {
        ...state,
      };
  }
};

export default shippingReducer;
