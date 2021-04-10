const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PRODUCTS":
      console.log(action.payload.products);
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
