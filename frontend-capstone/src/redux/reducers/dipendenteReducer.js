import { SAVE_DIPENDENTE } from "../actions";

const initialState = {
  dipendente: {},
};
const dipendenteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DIPENDENTE:
      return { ...state, dipendente: action.payload };
    default:
      return state;
  }
};
export default dipendenteReducer;
