const saveShippingAddress = (shippingAddress) => {
  return (dispatch) => {
    console.log(shippingAddress);
    localStorage.setItem("shipping_address", JSON.stringify(shippingAddress));
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: shippingAddress });
  };
};

export { saveShippingAddress };
