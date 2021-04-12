const INITIAL_STATE = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_CART_ITEM":
      const product = action.payload.product;
      const existItem = state.cartItems.find((item) => item.productId === product.productId);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => (item.productId === existItem.productId ? product : item)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, product],
        };
      }

    case "REMOVE_CART_ITEM":
      const newcardItems = state.cartItems.filter((item) => item.productId !== action.payload.productId);
      localStorage.setItem("cartItems", JSON.stringify(newcardItems));
      // console.log(newcardItems);
      return {
        ...state,
        cartItems: newcardItems,
        // products: action.payload.products,
      };

    default:
      return { ...state };
  }
};

export default productReducer;
