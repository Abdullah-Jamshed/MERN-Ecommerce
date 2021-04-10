import React from "react";

// COMPONENTS
import Routes from "./Router";

// REDUX
import { Provider } from "react-redux";
import store from "../store";

// STYLES
import "../styles/App.css";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
};

export default App;
