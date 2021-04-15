import API from "../../api";

const userLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "USER_LOGIN_REQUEST" });
      const { data } = await API.post(`/api/user/login`, { email, password });
      localStorage.setItem("token", data.token);
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: { user: data } });
    } catch (error) {
      console.log(error);
      dispatch({ type: "USER_LOGIN_FAIL", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

const userLogout = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
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
      dispatch({ type: "USER_LOAD_FAIL", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

export { userLogin, userLogout, isUserLogin };
