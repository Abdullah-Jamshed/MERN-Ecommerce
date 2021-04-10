import API from "../../api";

const fetchProduct = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING", payload: { flag: true } });
      const { data } = await API.get("/api/products");
      dispatch({ type: "PRODUCTS", payload: { products: data || [] } });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOADING", payload: { flag: false } });
    }
  };
};

const fetchProductById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING", payload: { flag: true } });
      const { data } = await API.get(`/api/products/${id}`);
      dispatch({ type: "PRODUCT", payload: { product: data || null } });
    } catch (err) {
      dispatch({ type: "LOADING", payload: { flag: false } });
    }
  };
};

const clearProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: "CLEAR" });
  };
};

export { fetchProduct, fetchProductById, clearProduct };
