import React from "react";

// COMPONENTS
// import Header from "./Header";
// import Footer from "./Footer";
import Routes from "./Router";

// SCREENS
// import HomeScreen from "../screens/HomeScreen";

// STYLES
import "../styles/App.css";

const App = () => {
  return (
    <>
      {/* <div className='App'>
        <div>
          <Header /> */}
      <Routes />
      {/* </div>
        <div>
          <Footer />
        </div>
      </div> */}
    </>
  );
};

export default App;
