import { LISTA_DIPENDENTI } from "../actions";

const initialState = {
  listaDipendenti: [],
};
const listaDipendentiReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTA_DIPENDENTI:
      return {
        ...state,
        listaDipendenti: action.payload,
      };
    default:
      return state;
  }
};
export default listaDipendentiReducer;
