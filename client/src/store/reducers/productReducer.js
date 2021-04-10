const INITIAL_STATE = {
  products: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
      };
    default:
      return { ...state };
  }
};

export default productReducer;
