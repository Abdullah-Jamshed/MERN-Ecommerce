const savePaymentMethod = (method) => {
  return (dispatch) => {
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: { method } });
    // localStorage.setItem("shipping_address", JSON.stringify(shippingAddress));
  };
};

export { savePaymentMethod };
