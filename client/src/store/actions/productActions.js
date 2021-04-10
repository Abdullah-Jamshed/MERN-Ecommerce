import API from "../../api";

const fetchProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await API.get("/api/products");
      dispatch({ type: "PRODUCTS", payload: { products: data || [] } });
    } catch (err) {
      console.log(err);
    }
  };
};

const fetchProductById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await API.get(`/api/products/${id}`);
      dispatch({ type: "PRODUCT", payload: { product: data || null } });
    } catch (err) {
      console.log(err);
    }
  };
};
const clearProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: "CLEAR" });
  };
};

export { fetchProduct, fetchProductById, clearProduct };
