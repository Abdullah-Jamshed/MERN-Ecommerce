import React from "react";

// UI LIBRARY COMPONENTS
import { Container } from "react-bootstrap";

// COMPONENTS
import Header from "./Header";
import Footer from "./Footer";

const App = () => {
  return (
    <>
      <Header />
      <Container classNam='py-3'>
        <h1>Hello world</h1>
      </Container>
      <Footer />
    </>
  );
};

export default App;
