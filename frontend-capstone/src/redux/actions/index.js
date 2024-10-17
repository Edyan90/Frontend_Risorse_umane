export const LOGIN = "LOGIN";
export const SAVE_DIPENDENTE = "SAVE_DIPENDENTE";
export const DARK_THEME = "DARK_THEME";
export const LISTA_DIPENDENTI = "LISTA_DIPENDENTI";
export const LISTA_FERIE = "LISTA_FERIE";
export const LISTA_BUSTEPAGA = "LISTA_BUSTEPAGA";
export const LISTA_PRESENZE = "LISTA_PRESENZE";
export const LISTA_ASSENZE = "LISTA_ASSENZE";

export const setLogin = (token) => ({
  type: LOGIN,
  payload: token,
});

export const setDipendente = (dipendente) => ({
  type: SAVE_DIPENDENTE,
  payload: dipendente,
});

export const toogleTheme = (darkTheme) => ({
  type: DARK_THEME,
  payload: !darkTheme,
});

export const setListaDipendenti = (listaDipendenti) => ({
  type: LISTA_DIPENDENTI,
  payload: listaDipendenti,
});

export const setListaFerie = (listaFerie) => ({
  type: LISTA_FERIE,
  payload: listaFerie,
});

export const setListBustePaga = (listaBustePaga) => ({
  type: LISTA_BUSTEPAGA,
  payload: listaBustePaga,
});

export const setListPresenze = (listaPresenze) => ({
  type: LISTA_PRESENZE,
  payload: listaPresenze,
});

export const setListAssenze = (listaAssenze) => ({
  type: LISTA_ASSENZE,
  payload: listaAssenze,
});
