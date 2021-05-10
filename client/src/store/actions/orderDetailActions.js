import API from "../../api/";

const getOrderById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ORDER_DETAIL_REQUEST" });
      const { data } = await API.get(`/api/order/${id}`);
      dispatch({ type: "ORDER_DETAIL_SUCCESS", payload: { data } });
    } catch (error) {
      dispatch({ type: "ORDER_DETAIL_FAILED", payload: { errorMessage: error.response.data?.msg } });
    }
  };
};

const getUserOrder = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "MY_ORDER_LIST_REQUEST" });
      const { data } = await API.get(`/api/order/myorders`);
      dispatch({ type: "MY_ORDER_LIST_SUCCESS", payload: { data } });
    } catch (error) {
      dispatch({ type: "MY_ORDER_LIST_FAILED", payload: { errorMessage: error.response.data?.msg } });
    }
  };
};

const getOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ORDER_LIST_REQUEST" });
      const { data } = await API.get(`/api/order/all`);
      dispatch({ type: "ORDER_LIST_SUCCESS", payload: { data } });
    } catch (error) {
      console.log(error)
      dispatch({ type: "ORDER_LIST_FAILED", payload: { errorMessage: error.response.data?.msg } });
    }
  };
};

const deliveryStatus = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ORDER_DELIVERY_STATUS_REQUEST" });
      const { data } = await API.put(`/api/order/${id}/deliver`);
      dispatch({ type: "ORDER_DELIVERY_STATUS_SUCCESS", payload: { data } });
    } catch (error) {
      dispatch({ type: "ORDER_DELIVERY_STATUS_FAILED", payload: { errorMessage: error.response.data?.msg } });
    }
  };
};

export { getOrderById, getUserOrder, getOrders, deliveryStatus };
