import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, Observable, Subject, switchMap, takeUntil} from "rxjs";
import {WeatherService} from "../../services/weather.service";
import {City, WeatherForecast} from "../../model/weather-forecast";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<null>();
  autoCompleteControl = new FormControl('');
  filteredOptions$!: Observable<any>;
  weatherForecast$: Observable<WeatherForecast>;
  selectedCity: City;

  constructor(private weatherService: WeatherService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.initListeners();
  }

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  initListeners() {
    this.route.params.pipe(takeUntil(this._destroy$)).pipe(switchMap(params => {
      const cityKey = params['cityKey'] ?? '215854';
      return this.weatherService.getLocationDetails(cityKey);
    })).subscribe(city => {
        // city.IsFavorite = this.weatherService.isFavorite(city);
        this.selectedCity = city;
      this.weatherForecast$ = this.weatherService.get5DaysWeather(city?.Key);
    });

    this.filteredOptions$ = this.autoCompleteControl.valueChanges
      .pipe(takeUntil(this._destroy$),debounceTime(400),
        switchMap(value => this.weatherService.getAutoComplete(value)));
  }

  displayCityName(city: City): string {
    return city && city.LocalizedName ? city.LocalizedName : '';
  }

  citySelected($event: MatAutocompleteSelectedEvent) {
    const value = $event.option.value;
    this.selectedCity = value;
    this.selectedCity.IsFavorite = this.weatherService.isFavorite(this.selectedCity);
    this.weatherForecast$ = this.weatherService.get5DaysWeather(value.Key);
  }
}
