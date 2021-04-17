import API from "../../api";

const addCartItem = (id, qty) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await API.get(`/api/products/${id}`);
      dispatch({
        type: "ADD_CART_ITEM",
        payload: {
          product: { productId: id, name: data.name, image: data.image, price: data.price, countInStock: data.countInStock, qty },
        },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cartItems));
    } catch (error) {
      console.log(error);
    }
  };
};

const removeCartItem = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "REMOVE_CART_ITEM",
      payload: {
        productId: id,
      },
    });
  };
};



const saveShippingAddress = (shippingAddress) => {
  return (dispatch) => {
    localStorage.setItem("shipping_address", JSON.stringify(shippingAddress));
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: shippingAddress });
  };
};


export { addCartItem, removeCartItem,saveShippingAddress };
