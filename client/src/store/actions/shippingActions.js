const saveShippingAddress = (shippingAddress) => {
  return (dispatch) => {
    if (shippingAddress) dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: shippingAddress });
    localStorage.setItem("shipping_address", JSON.stringify(shippingAddress));
  };
};

export { saveShippingAddress };
