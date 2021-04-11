import API from "../../api";

const addCartItem = (id, qty) => {
  return async (dispacth, getState) => {
    try {
      const { data } = await API.get(`/api/products/${id}`);
      dispacth({
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

export { addCartItem };
