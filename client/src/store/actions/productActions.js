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
      dispatch({ type: "PRODUCT_DELETE_SUCCESS" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "PRODUCT_DELETE_FAIL", payload: { msg: error.response.data.msg } });
    }
  };
};
const createProduct = (product) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_CREATE_REQUEST" });
      const { data } = await API.post(`/api/products`, product);
      dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: { product: data } });
    } catch (error) {
      console.log(error);
      dispatch({ type: "PRODUCT_CREATE_FAIL", payload: { msg: error.response.data.msg } });
    }
  };
};

const productUpdate = (id, form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_UPDATE_REQUEST" });
      const { data } = await API.put(`/api/products/${id}`, form);
      dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload: { product: data } });
    } catch (error) {
      dispatch({ type: "PRODUCT_UPDATE_FAIL", payload: { msg: error.response.data.msg } });
    }
  };
};
const fileUpload = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "IMAGE_URL_REQUEST" });
      dispatch({ type: "PROGRESS", payload: { progress: 0 } });

      const { data } = await API.post(`/api/uploads`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          dispatch({ type: "PROGRESS", payload: { progress } });
        },
      });
      dispatch({ type: "IMAGE_URL_SUCCESS", payload: { imageUrl: data } });
    } catch (error) {
      console.log("Error", error);
      dispatch({ type: "IMAGE_URL_FAIL" });
    }
  };
};

export { fetchProduct, fetchProductById, clearProduct, deleteProduct, createProduct, productUpdate, fileUpload };
