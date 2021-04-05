import React from "react";
import { useHistory } from "react-router-dom";

const ProductScreen = () => {
  const history = useHistory();
  console.log(history);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default ProductScreen;
