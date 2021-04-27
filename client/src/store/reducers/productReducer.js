const INITIAL_STATE = {
  products: [],
  product: null,
  isLoading: false,
  errorMessage: "",
  deleteSuccess: false,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload.flag,
        deleteSuccess: false,
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

    case "PRODUCT_DELETE_SUCCESS":
      return {
        ...state,
        deleteSuccess: true,
        isLoading: false,
      };
    case "PRODUCT_DELETE_FAIL":
      return {
        ...state,
        errorMessage: action.payload.msg,
        isLoading: false,
        // deleteSuccess: false,
      };
    default:
      return { ...state };
  }
};

export default productReducer;
