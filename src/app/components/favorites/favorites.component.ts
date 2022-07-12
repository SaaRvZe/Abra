import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/weather.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: {}
  constructor(private weatherService: WeatherService ){
    this.favorites = weatherService.getFavorites();
  }

  ngOnInit(): void {
  }

}
