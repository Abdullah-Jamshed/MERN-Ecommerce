import API from "../../api/";

const getOrderById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ORDER_DETAIL_REQUEST" });
      const { data } = await API.get(`/api/order/${id}`);
      console.log(data);
      dispatch({ type: "ORDER_DETAIL_SUCCESS", payload: { data } });
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: "ORDER_DETAIL_FAILED", payload: { errorMessage: error.response?.data.msg } });
    }
    //   localStorage.setItem("payment_method", method);
  };
};

export { getOrderById };
