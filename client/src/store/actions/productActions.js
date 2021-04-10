import API from "../../api";

const fetchProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await API.get("/products");
      dispatch({ type: "PRODUCTS", payload: { products: data || [] } });
    } catch (err) {
      console.log(err);
    }
  };
};

// const fetchProduct = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await API.get(`/products:${id}`);
//       dispatch({ type: "PRODUCTS", payload: { products: data || [] } });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export { fetchProduct };
