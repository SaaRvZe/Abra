import {Component, Input, OnInit} from '@angular/core';
import {City, WeatherForecast} from "../../../model/weather-forecast";
import {WeatherService} from "../../../services/weather.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit {
  @Input() weatherForecast: WeatherForecast;
  @Input() city: City;
  isFavorite$: Observable<{ isFav: boolean }>;
  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.isFavorite$ = this.weatherService.getFavorites().pipe(map(favorites => {
      return {isFav: !!favorites[this.city.Key]};
    }))
  }

  addFavorites(city: City) {
    this.weatherService.addFavorites(city);
  }

  removeFavorites(city: City) {
    this.weatherService.removeFavorites(city);
  }

}
