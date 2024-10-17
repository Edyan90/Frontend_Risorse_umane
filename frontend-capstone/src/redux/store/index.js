import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducer from "../reducers/mainReducer";
import dipendenteReducer from "../reducers/dipendenteReducer";
import themeReducer from "../reducers/themeReducer";
import listaDipendentiReducer from "../reducers/listaDipendentiReducer";
import listaBustePagaReducer from "../reducers/listaBustePagaReducer";
import listaFerieReducer from "../reducers/listaFerieReducer";
import listaAssenzeReducer from "../reducers/listaAssenzeReducer";
import listaPresenzeReducer from "../reducers/listaPresenzeReduce";

const bigReducer = combineReducers({
  main: mainReducer,
  dipendente: dipendenteReducer,
  theme: themeReducer,
  listaDipendenti: listaDipendentiReducer,
  listaFerie: listaFerieReducer,
  listaBustePaga: listaBustePagaReducer,
  listaAssenze: listaAssenzeReducer,
  listaPresenze: listaPresenzeReducer,
});
const store = configureStore({
  reducer: bigReducer,
});

export default store;
