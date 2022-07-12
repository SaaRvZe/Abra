import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, Observable, Subject, switchMap, takeUntil} from "rxjs";
import {WeatherService} from "../../services/weather.service";
import { WeatherForecast} from "../../model/weather-forecast";
import {Store} from "@ngrx/store";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

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
  selectedCity: any;

  constructor(private weatherService: WeatherService, private store: Store<{ count: number }>) {

  }
  ngOnInit() {
    this.filteredOptions$ = this.autoCompleteControl.valueChanges
      .pipe(takeUntil(this._destroy$),debounceTime(400),
        switchMap(value => this.weatherService.getAutoComplete(value)));

    this.weatherForecast$ = this.weatherService.get5DaysWeather('215854');

    this.weatherService.getLocationDetails('215854').subscribe(city => {
      city.isFavorite = this.weatherService.isFavorite(city);
      this.selectedCity = city;
    })
  }

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  displayCityName(city: any): string {
    return city && city.LocalizedName ? city.LocalizedName : '';
  }

  citySelected($event: MatAutocompleteSelectedEvent) {
    const value = $event.option.value;
    this.selectedCity = value;
    this.selectedCity.isFavorite = this.weatherService.isFavorite(this.selectedCity);
    this.weatherForecast$ = this.weatherService.get5DaysWeather(value.Key);
  }
}
