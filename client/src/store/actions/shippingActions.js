const saveShippingAddress = (shippingAddress) => {
  return (dispatch) => {
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: { shippingAddress } });
    localStorage.setItem("shipping_address", JSON.stringify(shippingAddress));
  };
};

export { saveShippingAddress };
