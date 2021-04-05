const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_LOADING":
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
