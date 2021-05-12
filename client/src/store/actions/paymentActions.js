import API from "../../api/";

const savePaymentMethod = (method) => {
  return (dispatch) => {
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: { method } });
    localStorage.setItem("payment_method", method);
  };
};

const payOrder = (orderId, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "ORDER_PAY_REQUEST" });
      const { data } = await API.put(`/api/order/${orderId}/pay/`, paymentResult);
      dispatch({ type: "ORDER_PAY_SUCCESS", payload: { data } });
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: "ORDER_PAY_FAILED", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

const resetOrderPay = () => {
  return async (dispatch) => {
    dispatch({ type: "ORDER_PAY_RESET" });
  };
};

export { savePaymentMethod, payOrder, resetOrderPay };
