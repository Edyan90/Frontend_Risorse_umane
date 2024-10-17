import { LISTA_BUSTEPAGA } from "../actions";

const initialState = {
  listaBustePaga: [],
};
const listaBustePagaReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTA_BUSTEPAGA:
      return {
        ...state,
        listaBustePaga: action.payload,
      };
    default:
      return state;
  }
};
export default listaBustePagaReducer;
