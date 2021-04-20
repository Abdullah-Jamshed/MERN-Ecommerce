const savePaymentMethod = (method) => {
  return (dispatch) => {
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: { method } });
    localStorage.setItem("payment_method", method);
  };
};

export { savePaymentMethod };
