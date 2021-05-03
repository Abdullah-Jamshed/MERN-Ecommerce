const INITIAL_STATE = {
  products: [],
  product: null,
  isLoading: false,
  errorMessage: "",
  deleteSuccess: false,
  createdProduct: null,
  successCreate: false,
  buttonLoader: false,
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

    case "PRODUCT_CREATE_REQUEST":
      return {
        ...state,
        buttonLoader: true,
        successCreate: false,
        createdProduct: null,
      };
    case "PRODUCT_CREATE_SUCCESS":
      return {
        ...state,
        createdProduct: action.payload.product,
        buttonLoader: false,
        successCreate: true,
      };
    case "PRODUCT_CREATE_FAIL":
      return {
        ...state,
        createdProduct: null,
        errorMessage: action.payload.msg,
        buttonLoader: false,
        successCreate: false,
      };
    case "PRODUCT_CREATE_RESET":
      return {
        ...state,
        createdProduct: null,
        errorMessage: null,
        buttonLoader: false,
        successCreate: false,
      };

    default:
      return { ...state };
  }
};

export default productReducer;
