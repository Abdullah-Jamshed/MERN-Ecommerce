import API from "../../api/";

const createOrder = ({ itemPrice, shippingPrice, taxPrice, totalPrice, shippingAddress, cartItems, paymentMethod }) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "ORDER_CREATE_REQUEST" });
      const { data } = await API.post("/api/order", {
        orderItems: cartItems,
        paymentMethod,
        shippingAddress,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      console.log(data);
      dispatch({ type: "ORDER_CREATE_SUCCESS", payload: { data } });
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: "ORDER_CREATE_FAILED", payload: { errorMessage: error.response?.data.msg } });
    }
    //   localStorage.setItem("payment_method", method);
  };
};

export { createOrder };
