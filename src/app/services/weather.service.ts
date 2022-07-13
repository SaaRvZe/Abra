import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {City, CurrentWeather, Weather} from "../model/weather-forecast";
import {Store} from "@ngrx/store";
import {addToFavorites, removeFromFavorites} from "../state/favorites.actions";
import { selectFavorites} from "../state/favorites.selectors";
import {ReadOnlyDictionary} from "../state/readonly-dictionary";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _favorites$ = this.store.select(selectFavorites);

  constructor(private sanitizer: DomSanitizer, private http: HttpClient,
              private store: Store, private _snackBar: MatSnackBar) {

    this._favorites$ = store.select(selectFavorites);
  }

  getSafeIconLink(iconNumber: number) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.accuweather.com//images/weathericons/${iconNumber}.svg`);

  }

  getLocationDetails(cityKey: string): Observable<City> {
    return this.http.get<City>
    (`${environment.accuweatherHost}/locations/v1/${cityKey}?apikey=${environment.accuweatherApiKey}`)
      .pipe(catchError(err => {
       this.onError(err,'Failed to get location details please try again');
        return throwError(err);
      }));
  }

  getCurrentWeather(cityKey: string): Observable<CurrentWeather[]> {
    return this.http
      .get<CurrentWeather[]>(`${environment.accuweatherHost}/currentconditions/v1/${cityKey}?apikey=${environment.accuweatherApiKey}`)
      .pipe(map(weather => {
          weather.map((w: any) => {
            w.IconLink = this.getSafeIconLink(w.WeatherIcon);
          })
          return weather;
        })
      ).pipe(catchError(err => {
        this.onError(err,'Failed to get Current Weather please try again');
        return throwError(err);
      }));
  }

  get5DaysWeather(cityKey: string) {
    return this.http
      .get<any>(`${environment.accuweatherHost}/forecasts/v1/daily/5day/${cityKey}?apikey=${environment.accuweatherApiKey}&metric=true`)
      .pipe(map(forecast => {
        forecast.DailyForecasts.forEach((daily: Weather) => {
          daily.IconLink = this.getSafeIconLink(daily.Day.Icon);
        })
        return forecast;
      })).pipe(catchError(err => {
        this.onError(err,'Failed to get Current Weather please try again');
        return throwError(err);
      }));
  }

  getAutoComplete(q: any) {

    return this.http
      .get(`${environment.accuweatherHost}/locations/v1/cities/autocomplete?apikey=${environment.accuweatherApiKey}&q=${q}`)
      .pipe(catchError(err => {
        this.onError(err,'Failed to get Current Weather please try again');
        return throwError(err);
      }));
  }

  addFavorites(city: City) {
    this.store.dispatch(addToFavorites({city: city}));
  }

  removeFavorites(city: City) {
    this.store.dispatch(removeFromFavorites({city: city}));
  }

  isFavorite(city: City): boolean {
    // @ts-ignore
    return !!this._favorites$[city.Key];
  }

  getFavorites(): Observable<ReadOnlyDictionary<City>> {
    return this._favorites$;
  }

  onError(error: HttpErrorResponse, msg: string) {
    console.error(error.message);
    this._snackBar.open(msg, 'Ok <3');
  }
}
