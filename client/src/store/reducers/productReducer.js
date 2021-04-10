const INITIAL_STATE = {
  products: [],
  product: null,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
      };
    case "PRODUCT":
      return {
        ...state,
        product: action.payload.product,
      };
    case "CLEAR":
      return {
        ...state,
        product: null,
      };
    default:
      return { ...state };
  }
};

export default productReducer;
