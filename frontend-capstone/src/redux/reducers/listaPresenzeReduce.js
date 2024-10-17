import { LISTA_PRESENZE } from "../actions";

const initialState = {
  listaPresenze: [],
};
const listaPresenzeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTA_PRESENZE:
      return {
        ...state,
        listaPresenze: action.payload,
      };
    default:
      return state;
  }
};
export default listaPresenzeReducer;
