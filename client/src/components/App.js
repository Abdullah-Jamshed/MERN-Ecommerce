import React from "react";

// COMPONENTS
// import Header from "./Header";
// import Footer from "./Footer";
import Routes from "./Router";

// SCREENS
// import HomeScreen from "../screens/HomeScreen";

// REDUX
import { Provider } from "react-redux";
import store from "../store";

// STYLES
import "../styles/App.css";

const App = () => {
  return (
    <>
      {/* <div className='App'>
        <div>
          <Header /> */}
      <Provider store={store}>
        <Routes />
      </Provider>
      {/* </div>
        <div>
          <Footer />
        </div>
      </div> */}
    </>
  );
};

export default App;
