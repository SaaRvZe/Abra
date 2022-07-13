import { createAction, props } from "@ngrx/store";
import { City } from "../model/weather-forecast";

export const addToFavorites = createAction(
  '[Favorites] Add City',
  props<{ city: City }>()
);

export const removeFromFavorites = createAction(
  '[Favorites] Remove City',
  props<{ city: City }>()
);

