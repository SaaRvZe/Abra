import { createReducer, on } from "@ngrx/store";
import {addToFavorites, removeFromFavorites} from "./favorites.actions";
import { City } from "../model/weather-forecast";
import { ReadOnlyDictionary } from "./readonly-dictionary";

export const initialState: ReadOnlyDictionary<City> = {};

export const favoritesReducer = createReducer(
  initialState,
  on(removeFromFavorites, (state, { city: city }) => {
   return Object.fromEntries(Object.entries(state).filter(([k,v]) => v.Key !== city.Key))
  }),
  on(addToFavorites, (state, { city: city }) => {
     if (state[city.Key]) return state;
    return {...state, [city.Key]: city};
  })
);
