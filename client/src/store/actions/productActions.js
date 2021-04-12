import API from "../../api";

const fetchProduct = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING", payload: { flag: true } });
      const { data } = await API.get("/api/products");
      dispatch({ type: "PRODUCTS", payload: { products: data || [] } });
    } catch (err) {
      // console.log(err.response.data);
      // console.log(err.message);
      dispatch({ type: "FETCH_FAILED", payload: { msg: err.response?.data.msg || "Some thing Went Wrong" } });
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
      dispatch({ type: "FETCH_FAILED", payload: { msg: err.response.data.msg || "Some thing Went Wrong" } });
    }
  };
};

const clearProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: "CLEAR" });
  };
};

export { fetchProduct, fetchProductById, clearProduct };
