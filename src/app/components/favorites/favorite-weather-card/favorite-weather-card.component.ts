import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../services/weather.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-favorite-weather-card',
  templateUrl: './favorite-weather-card.component.html',
  styleUrls: ['./favorite-weather-card.component.scss']
})
export class FavoriteWeatherCardComponent implements OnInit {
  @Input() city: any;
  weather$: Observable<any>;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weather$ = this.weatherService.getCurrentWeather(this.city?.Key).pipe(tap(data => console.log('current',data)))
  }

  removeFavorites(city: any) {
      this.weatherService.removeFavorites(city);
  }
}
