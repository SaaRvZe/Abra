import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {ReadOnlyDictionary} from "../../state/readonly-dictionary";
import {City} from "../../model/weather-forecast";
import {Observable} from "rxjs";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<ReadOnlyDictionary<City>>;
  constructor(private weatherService: WeatherService ){
    this.favorites$ = weatherService.getFavorites();
  }

  ngOnInit(): void {
  }

}
