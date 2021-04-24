import API from "../../api";

const userLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "USER_LOADER" });
      const { data } = await API.post(`/api/user/login`, { email, password });
      localStorage.setItem("token", data?.token);
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: { user: data } });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: "USER_LOGIN_FAIL", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

const userLogout = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: "MY_ORDER_LIST_RESET" });
    dispatch({ type: "USER_LOGOUT" });
  };
};

const isUserLogin = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().userReducer.token;
      if (token) {
        const { data } = await API.get(`/api/user/profile`);
        dispatch({ type: "USER_LOADED", payload: { user: data } });
      }
    } catch (error) {
      dispatch({ type: "USER_LOAD_FAIL" });
    }
  };
};

const userSignUp = ({ name, email, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "USER_LOADER" });
      const { data } = await API.post(`/api/user`, { name, email, password });
      localStorage.setItem("token", data?.token);
      dispatch({ type: "USER_SIGNUP_SUCCESS", payload: { user: data } });
    } catch (error) {
      console.log(error);
      dispatch({ type: "USER_SIGNUP_FAIL", payload: { errorMessage: error.response.data.msg } });
    }
  };
};
const userUpdate = ({ name, email, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "USER_LOADER" });
      const { data } = await API.put(`/api/user/profile`, { name, email, password });
      dispatch({ type: "USER_UPDATE_SUCCESS", payload: { user: data, success: true } });
    } catch (error) {
      dispatch({ type: "USER_UPDATE_FAIL", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

const clearErrorMessage = () => {
  return async (dispatch) => {
    dispatch({ type: "CLEAR_ERROR_MESSAGE" });
  };
};

export { userLogin, userLogout, isUserLogin, userSignUp, clearErrorMessage, userUpdate };
