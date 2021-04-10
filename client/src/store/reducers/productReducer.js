const INITIAL_STATE = {
  products: [],
  product: null,
  isLoading: false,
  errorMessage: "",
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload.flag,
      };

    case "PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
        isLoading: false,
      };
    case "PRODUCT":
      return {
        ...state,
        product: action.payload.product,
        isLoading: false,
      };
    case "CLEAR":
      return {
        ...state,
        product: null,
      };
    case "FETCH_FAILED":
      return {
        ...state,
        errorMessage: action.payload.msg,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default productReducer;
