import React, { useState } from "react";

// UI LIBRARY COMPONENT
import { Button } from "react-bootstrap";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/actions/userActions";

const LoginScreen = () => {
  //STATE
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // REDUX STATE HOOK
  const { user } = useSelector((state) => state.userReducer);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // HANDLER FUNCTIONS
  const formHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const login = () => {
    dispatch(userLogin(form));
  };

  return (
    <div>
      <h1>login Screen</h1>
      {user && <h1>{user.name}</h1>}
      <input onChange={formHandler} type='text' value={form.email} name='email' />
      <input onChange={formHandler} type='password' value={form.password} name='password' />
      <Button type='button' onClick={login}>
        Login
      </Button>
    </div>
  );
};

export default LoginScreen;
