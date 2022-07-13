import { createFeatureSelector } from '@ngrx/store';
import { City } from "../model/weather-forecast";
import {ReadOnlyDictionary} from "./readonly-dictionary";

export const selectFavorites = createFeatureSelector<ReadOnlyDictionary<City>>('favorites');


