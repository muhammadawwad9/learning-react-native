const initState = {
  employees: [],
  loading: true,
};

//whatever the reducer returns, it will be the cetnral state
export const reducer = (state = initState, action) => {
  if (action.type == "ADD_DATA") return { ...state, employees: action.payload };
  if (action.type == "SET_LOADING")
    return { ...state, loading: action.payload };
  return state;
};
