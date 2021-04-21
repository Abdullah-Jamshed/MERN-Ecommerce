import API from "../../api/";

const createOrder = ({ itemPrice, shippingPrice, taxPrice, totalPrice }) => {
  return async (dispatch, getState) => {
    try {
      const { cartItems } = getState().cartReducer;
      const { shippingAddress } = getState().shippingReducer;
      const { paymentMethod } = getState().paymentReducer;
      const res = await API.post("/api/order", {
        orderItems: cartItems,
        paymentMethod,
        shippingAddress,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
    //   dispatch({ type: "SAVE_PAYMENT_METHOD", payload: { method } });
    //   localStorage.setItem("payment_method", method);
  };
};

export { createOrder };
