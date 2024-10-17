import { LISTA_FERIE } from "../actions";

const initialState = {
  listaFerie: [],
};
const listaFerieReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTA_FERIE:
      return {
        ...state,
        listaFerie: action.payload,
      };
    default:
      return state;
  }
};
export default listaFerieReducer;
