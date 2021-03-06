import API from "../../api";

const userLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: "USER_LOADER" });
      dispatch({ type: "BUTTON_LOADER" });
      const { data } = await API.post(`/api/user/login`, { email, password });
      localStorage.setItem("token", data?.token);
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: { user: data } });
    } catch (error) {
      dispatch({ type: "USER_LOGIN_FAIL", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

const userLogout = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: "MY_ORDER_LIST_RESET" });
    dispatch({ type: "USER_LIST_RESET" });
    dispatch({ type: "USER_LOGOUT" });
  };
};

const isUserLogin = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().userReducer.token;
      if (token) {
        const { data } = await API.get(`/api/user/profile`);
        dispatch({ type: "USER_LOADED_SUCCESS", payload: { user: data } });
      } else {
        dispatch({ type: "USER_LOAD_FAIL" });
      }
    } catch (error) {
      dispatch({ type: "USER_LOAD_FAIL" });
    }
  };
};

const userSignUp = ({ name, email, password }) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: "USER_LOADER" });
      dispatch({ type: "BUTTON_LOADER" });
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
      // dispatch({ type: "USER_LOADER" });
      dispatch({ type: "BUTTON_LOADER" });
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

const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "USER_LOADER" });
      const { data } = await API.get(`/api/user/all`);
      dispatch({ type: "USER_LIST_SUCCESS", payload: { users: data } });
    } catch (error) {
      dispatch({ type: "USER_LIST_FAIL", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "USER_LOADER" });
      await API.delete(`/api/user/${id}`);
      dispatch({ type: "USER_LIST_UPDATE", payload: { id } });
    } catch (error) {
      console.log(error);
      dispatch({ type: "USER_LIST_FAIL", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

const getUserDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "USER_LOADER" });
      const { data } = await API.get(`/api/user/${id}`);
      dispatch({ type: "USER_DETAIL_SUCCESS", payload: { userDetails: data } });
    } catch (error) {
      dispatch({ type: "USER_DETAIL_FAIL", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

const clearUserDetail = () => {
  return (dispatch) => {
    dispatch({ type: "USER_DETAIL_RESET" });
  };
};

const userUpdateByAdmin = (id, form) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: "USER_LOADER" });
      dispatch({ type: "BUTTON_LOADER" });
      const { data } = await API.put(`/api/user/${id}`, form);
      dispatch({ type: "USER_DETAIL_UPDATE_SUCCESS", payload: { userDetails: data } });
    } catch (error) {
      dispatch({ type: "USER_DETAIL_UPDATE_FAIL", payload: { errorMessage: error.response.data.msg } });
    }
  };
};

export {
  userLogin,
  userLogout,
  isUserLogin,
  userSignUp,
  clearErrorMessage,
  userUpdate,
  getUsers,
  deleteUser,
  getUserDetails,
  clearUserDetail,
  userUpdateByAdmin,
};
