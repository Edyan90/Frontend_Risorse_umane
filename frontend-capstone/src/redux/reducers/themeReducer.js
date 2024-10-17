import { DARK_THEME } from "../actions";

const initialState = {
  darkTheme: false,
};
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DARK_THEME:
      return {
        ...state,
        darkTheme: action.payload,
      };
    default:
      return state;
  }
};
export default themeReducer;
