import { City } from "../model/weather-forecast";
import {ReadOnlyDictionary} from "./readonly-dictionary";

export interface AppState {
  favorites: ReadOnlyDictionary<City[]>;
}
