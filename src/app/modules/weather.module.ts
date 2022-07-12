import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "../components/home/home.component";
import {FavoritesComponent} from "../components/favorites/favorites.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {CityWeatherComponent} from "../components/home/city-weather/city-weather.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {
  FavoriteWeatherCardComponent
} from "../components/favorites/favorite-weather-card/favorite-weather-card.component";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    HomeComponent,
    FavoritesComponent,
    CityWeatherComponent,
    FavoriteWeatherCardComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
  ]
})
export class WeatherModule { }
