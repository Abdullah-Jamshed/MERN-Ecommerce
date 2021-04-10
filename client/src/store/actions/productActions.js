import API from "../../api";

const fetchProduct = () => {
  return async (dispatch) => {
    console.log("dispacth fetch");
    // try {
    //   console.log("Data Loadded");
    //   // const products = await API.get("/");
    //   // console.log(products);
    //   const products = await API.get("");
    // } catch (err) {
    //   console.log(err);
    // }
    // dispatch({ type: "PRODUCTS", payload: { products } });
  };
};

export { fetchProduct };
