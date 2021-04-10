import API from "../../api";

const fetchProduct = () => {
  return async (dispatch) => {
    try {
      const { data } = await API.get("/");
      dispatch({ type: "PRODUCTS", payload: { products: data || [] } });
    } catch (err) {
      console.log(err);
    }
  };
};

export { fetchProduct };
