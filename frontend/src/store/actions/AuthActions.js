import Api from "../../config/api/index.js";


const successLogin = (data) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_SUCCESS", payload: { data } });
  };
};



export {  successLogin };
