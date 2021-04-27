import API from "../../api";

const fetchProduct = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING", payload: { flag: true } });
      const { data } = await API.get("/api/products");
      dispatch({ type: "PRODUCTS", payload: { products: data || [] } });
    } catch (error) {
      // console.log(err.response.data);
      // console.log(err.message);
      // dispatch({ type: "FETCH_FAILED", payload: { msg: err.response?.data.msg || "Some thing Went Wrong" } });
      dispatch({ type: "FETCH_FAILED", payload: { msg: error.response?.data.msg } });
    }
  };
};

const fetchProductById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING", payload: { flag: true } });
      const { data } = await API.get(`/api/products/${id}`);
      dispatch({ type: "PRODUCT", payload: { product: data || null } });
    } catch (error) {
      // dispatch({ type: "FETCH_FAILED", payload: { msg: err.response.data.msg || "Some thing Went Wrong" } });
      dispatch({ type: "FETCH_FAILED", payload: { msg: error.response.data.msg } });
    }
  };
};

const clearProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: "CLEAR" });
  };
};

const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await API.delete(`/api/products/${id}`);
      dispatch({ type: "PRODUCT_DELETE_SUCCESS",});
    } catch (error) {
      console.log(error);
      dispatch({ type: "PRODUCT_DELETE_FAIL", payload: { msg: error.response.data.msg } });
    }
  };
};

export { fetchProduct, fetchProductById, clearProduct, deleteProduct };
