import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../services/weather.service";
import {map, Observable} from "rxjs";
import {City, CurrentWeather} from "../../../model/weather-forecast";

@Component({
  selector: 'app-favorite-weather-card',
  templateUrl: './favorite-weather-card.component.html',
  styleUrls: ['./favorite-weather-card.component.scss']
})
export class FavoriteWeatherCardComponent implements OnInit {
  @Input() city: City;
  weather$: Observable<CurrentWeather>;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weather$ = this.weatherService.getCurrentWeather(this.city?.Key).pipe(map(weather => weather[0]));
  }

  removeFavorites(city: City) {
      this.weatherService.removeFavorites(city);
  }
}
