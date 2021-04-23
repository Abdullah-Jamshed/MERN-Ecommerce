import API from "../../api/";

const getOrderById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ORDER_DETAIL_REQUEST" });
      const { data } = await API.get(`/api/order/${id}`);
      dispatch({ type: "ORDER_DETAIL_SUCCESS", payload: { data } });
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: "ORDER_DETAIL_FAILED", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

export { getOrderById };
