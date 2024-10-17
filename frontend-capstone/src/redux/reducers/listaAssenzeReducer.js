import { LISTA_ASSENZE } from "../actions";

const initialState = {
  listaAssenze: [],
};
const listaAssenzeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTA_ASSENZE:
      return {
        ...state,
        listaAssenze: action.payload,
      };
    default:
      return state;
  }
};
export default listaAssenzeReducer;
