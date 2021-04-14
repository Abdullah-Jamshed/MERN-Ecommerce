import API from "../../api";

const userLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "USER_LOGIN_REQUEST" });
      const { data } = await API.post(`/api/user/login`, { email, password });
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: { user: data } });
    } catch (error) {
      dispatch({ type: "USER_LOGIN_FAIL", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

const removeCartItem = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "REMOVE_CART_ITEM",
      payload: {
        productId: id,
      },
    });
  };
};

export { userLogin, removeCartItem };
