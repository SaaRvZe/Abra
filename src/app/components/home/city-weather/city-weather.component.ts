import {Component, Input, OnInit} from '@angular/core';
import {WeatherForecast} from "../../../model/weather-forecast";
import {WeatherService} from "../../../services/weather.service";

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit {
  @Input() weatherForecast: WeatherForecast;
  @Input() city: any;
  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
  }

  //TODO create state management and a class/interface for city
  toggleFavorites(city: any) {
    if(this.city?.isFavorite) {
      this.weatherService.removeFavorites(city);
    } else {
      this.weatherService.addFavorites(city);
    }
    this.city.isFavorite = !this.city?.isFavorite;
  }

}
