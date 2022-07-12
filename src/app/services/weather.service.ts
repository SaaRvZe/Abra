import { Injectable } from '@angular/core';
import {map, of} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _favorites = {};
  favoritesKey = '_favorites';
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {
    this._favorites = JSON.parse(localStorage.getItem(this.favoritesKey) ?? '{}');
  }

  getSafeIconLink(iconNumber: number) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.accuweather.com//images/weathericons/${iconNumber}.svg`);

  }

  getLocationDetails(cityKey: string) {
    return this.http.get<any>(`${environment.accuweatherHost}/locations/v1/${cityKey}?apikey=${environment.accuweatherApiKey}`);
  }

  getCurrentWeather(cityKey: string) {
    return this.http
      .get<any>(`${environment.accuweatherHost}/currentconditions/v1/${cityKey}?apikey=${environment.accuweatherApiKey}`)
      .pipe(map(weather => {
          console.log('mape current', weather);
          weather.map((w: any) => {
            w.iconLink = this.getSafeIconLink(w.WeatherIcon);
          })
          return weather;
        })
      );

    return of(JSON.parse('[\n' +
      '    {\n' +
      '        "LocalObservationDateTime": "2022-07-09T13:33:00+03:00",\n' +
      '        "EpochTime": 1657362780,\n' +
      '        "WeatherText": "Sunny",\n' +
      '        "WeatherIcon": 1,\n' +
      '        "HasPrecipitation": false,\n' +
      '        "PrecipitationType": null,\n' +
      '        "IsDayTime": true,\n' +
      '        "Temperature": {\n' +
      '            "Metric": {\n' +
      '                "Value": 28.3,\n' +
      '                "Unit": "C",\n' +
      '                "UnitType": 17\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": 83.0,\n' +
      '                "Unit": "F",\n' +
      '                "UnitType": 18\n' +
      '            }\n' +
      '        },\n' +
      '        "RealFeelTemperature": {\n' +
      '            "Metric": {\n' +
      '                "Value": 31.7,\n' +
      '                "Unit": "C",\n' +
      '                "UnitType": 17,\n' +
      '                "Phrase": "Hot"\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": 89.0,\n' +
      '                "Unit": "F",\n' +
      '                "UnitType": 18,\n' +
      '                "Phrase": "Very Warm"\n' +
      '            }\n' +
      '        },\n' +
      '        "RealFeelTemperatureShade": {\n' +
      '            "Metric": {\n' +
      '                "Value": 27.2,\n' +
      '                "Unit": "C",\n' +
      '                "UnitType": 17,\n' +
      '                "Phrase": "Very Warm"\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": 81.0,\n' +
      '                "Unit": "F",\n' +
      '                "UnitType": 18,\n' +
      '                "Phrase": "Pleasant"\n' +
      '            }\n' +
      '        },\n' +
      '        "RelativeHumidity": 55,\n' +
      '        "IndoorRelativeHumidity": 55,\n' +
      '        "DewPoint": {\n' +
      '            "Metric": {\n' +
      '                "Value": 18.5,\n' +
      '                "Unit": "C",\n' +
      '                "UnitType": 17\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": 65.0,\n' +
      '                "Unit": "F",\n' +
      '                "UnitType": 18\n' +
      '            }\n' +
      '        },\n' +
      '        "Wind": {\n' +
      '            "Direction": {\n' +
      '                "Degrees": 270,\n' +
      '                "Localized": "W",\n' +
      '                "English": "W"\n' +
      '            },\n' +
      '            "Speed": {\n' +
      '                "Metric": {\n' +
      '                    "Value": 19.4,\n' +
      '                    "Unit": "km/h",\n' +
      '                    "UnitType": 7\n' +
      '                },\n' +
      '                "Imperial": {\n' +
      '                    "Value": 12.1,\n' +
      '                    "Unit": "mi/h",\n' +
      '                    "UnitType": 9\n' +
      '                }\n' +
      '            }\n' +
      '        },\n' +
      '        "WindGust": {\n' +
      '            "Speed": {\n' +
      '                "Metric": {\n' +
      '                    "Value": 35.4,\n' +
      '                    "Unit": "km/h",\n' +
      '                    "UnitType": 7\n' +
      '                },\n' +
      '                "Imperial": {\n' +
      '                    "Value": 22.0,\n' +
      '                    "Unit": "mi/h",\n' +
      '                    "UnitType": 9\n' +
      '                }\n' +
      '            }\n' +
      '        },\n' +
      '        "UVIndex": 12,\n' +
      '        "UVIndexText": "Extreme",\n' +
      '        "Visibility": {\n' +
      '            "Metric": {\n' +
      '                "Value": 16.1,\n' +
      '                "Unit": "km",\n' +
      '                "UnitType": 6\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": 10.0,\n' +
      '                "Unit": "mi",\n' +
      '                "UnitType": 2\n' +
      '            }\n' +
      '        },\n' +
      '        "ObstructionsToVisibility": "",\n' +
      '        "CloudCover": 1,\n' +
      '        "Ceiling": {\n' +
      '            "Metric": {\n' +
      '                "Value": 9144.0,\n' +
      '                "Unit": "m",\n' +
      '                "UnitType": 5\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": 30000.0,\n' +
      '                "Unit": "ft",\n' +
      '                "UnitType": 0\n' +
      '            }\n' +
      '        },\n' +
      '        "Pressure": {\n' +
      '            "Metric": {\n' +
      '                "Value": 1006.8,\n' +
      '                "Unit": "mb",\n' +
      '                "UnitType": 14\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": 29.73,\n' +
      '                "Unit": "inHg",\n' +
      '                "UnitType": 12\n' +
      '            }\n' +
      '        },\n' +
      '        "PressureTendency": {\n' +
      '            "LocalizedText": "Falling",\n' +
      '            "Code": "F"\n' +
      '        },\n' +
      '        "Past24HourTemperatureDeparture": {\n' +
      '            "Metric": {\n' +
      '                "Value": -1.3,\n' +
      '                "Unit": "C",\n' +
      '                "UnitType": 17\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": -2.0,\n' +
      '                "Unit": "F",\n' +
      '                "UnitType": 18\n' +
      '            }\n' +
      '        },\n' +
      '        "ApparentTemperature": {\n' +
      '            "Metric": {\n' +
      '                "Value": 29.4,\n' +
      '                "Unit": "C",\n' +
      '                "UnitType": 17\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": 85.0,\n' +
      '                "Unit": "F",\n' +
      '                "UnitType": 18\n' +
      '            }\n' +
      '        },\n' +
      '        "WindChillTemperature": {\n' +
      '            "Metric": {\n' +
      '                "Value": 28.3,\n' +
      '                "Unit": "C",\n' +
      '                "UnitType": 17\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": 83.0,\n' +
      '                "Unit": "F",\n' +
      '                "UnitType": 18\n' +
      '            }\n' +
      '        },\n' +
      '        "WetBulbTemperature": {\n' +
      '            "Metric": {\n' +
      '                "Value": 21.8,\n' +
      '                "Unit": "C",\n' +
      '                "UnitType": 17\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": 71.0,\n' +
      '                "Unit": "F",\n' +
      '                "UnitType": 18\n' +
      '            }\n' +
      '        },\n' +
      '        "Precip1hr": {\n' +
      '            "Metric": {\n' +
      '                "Value": 0.0,\n' +
      '                "Unit": "mm",\n' +
      '                "UnitType": 3\n' +
      '            },\n' +
      '            "Imperial": {\n' +
      '                "Value": 0.0,\n' +
      '                "Unit": "in",\n' +
      '                "UnitType": 1\n' +
      '            }\n' +
      '        },\n' +
      '        "PrecipitationSummary": {\n' +
      '            "Precipitation": {\n' +
      '                "Metric": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Imperial": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "in",\n' +
      '                    "UnitType": 1\n' +
      '                }\n' +
      '            },\n' +
      '            "PastHour": {\n' +
      '                "Metric": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Imperial": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "in",\n' +
      '                    "UnitType": 1\n' +
      '                }\n' +
      '            },\n' +
      '            "Past3Hours": {\n' +
      '                "Metric": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Imperial": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "in",\n' +
      '                    "UnitType": 1\n' +
      '                }\n' +
      '            },\n' +
      '            "Past6Hours": {\n' +
      '                "Metric": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Imperial": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "in",\n' +
      '                    "UnitType": 1\n' +
      '                }\n' +
      '            },\n' +
      '            "Past9Hours": {\n' +
      '                "Metric": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Imperial": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "in",\n' +
      '                    "UnitType": 1\n' +
      '                }\n' +
      '            },\n' +
      '            "Past12Hours": {\n' +
      '                "Metric": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Imperial": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "in",\n' +
      '                    "UnitType": 1\n' +
      '                }\n' +
      '            },\n' +
      '            "Past18Hours": {\n' +
      '                "Metric": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Imperial": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "in",\n' +
      '                    "UnitType": 1\n' +
      '                }\n' +
      '            },\n' +
      '            "Past24Hours": {\n' +
      '                "Metric": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Imperial": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "in",\n' +
      '                    "UnitType": 1\n' +
      '                }\n' +
      '            }\n' +
      '        },\n' +
      '        "TemperatureSummary": {\n' +
      '            "Past6HourRange": {\n' +
      '                "Minimum": {\n' +
      '                    "Metric": {\n' +
      '                        "Value": 22.9,\n' +
      '                        "Unit": "C",\n' +
      '                        "UnitType": 17\n' +
      '                    },\n' +
      '                    "Imperial": {\n' +
      '                        "Value": 73.0,\n' +
      '                        "Unit": "F",\n' +
      '                        "UnitType": 18\n' +
      '                    }\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Metric": {\n' +
      '                        "Value": 29.7,\n' +
      '                        "Unit": "C",\n' +
      '                        "UnitType": 17\n' +
      '                    },\n' +
      '                    "Imperial": {\n' +
      '                        "Value": 85.0,\n' +
      '                        "Unit": "F",\n' +
      '                        "UnitType": 18\n' +
      '                    }\n' +
      '                }\n' +
      '            },\n' +
      '            "Past12HourRange": {\n' +
      '                "Minimum": {\n' +
      '                    "Metric": {\n' +
      '                        "Value": 21.6,\n' +
      '                        "Unit": "C",\n' +
      '                        "UnitType": 17\n' +
      '                    },\n' +
      '                    "Imperial": {\n' +
      '                        "Value": 71.0,\n' +
      '                        "Unit": "F",\n' +
      '                        "UnitType": 18\n' +
      '                    }\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Metric": {\n' +
      '                        "Value": 29.7,\n' +
      '                        "Unit": "C",\n' +
      '                        "UnitType": 17\n' +
      '                    },\n' +
      '                    "Imperial": {\n' +
      '                        "Value": 85.0,\n' +
      '                        "Unit": "F",\n' +
      '                        "UnitType": 18\n' +
      '                    }\n' +
      '                }\n' +
      '            },\n' +
      '            "Past24HourRange": {\n' +
      '                "Minimum": {\n' +
      '                    "Metric": {\n' +
      '                        "Value": 21.6,\n' +
      '                        "Unit": "C",\n' +
      '                        "UnitType": 17\n' +
      '                    },\n' +
      '                    "Imperial": {\n' +
      '                        "Value": 71.0,\n' +
      '                        "Unit": "F",\n' +
      '                        "UnitType": 18\n' +
      '                    }\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Metric": {\n' +
      '                        "Value": 31.7,\n' +
      '                        "Unit": "C",\n' +
      '                        "UnitType": 17\n' +
      '                    },\n' +
      '                    "Imperial": {\n' +
      '                        "Value": 89.0,\n' +
      '                        "Unit": "F",\n' +
      '                        "UnitType": 18\n' +
      '                    }\n' +
      '                }\n' +
      '            }\n' +
      '        },\n' +
      '        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",\n' +
      '        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"\n' +
      '    }\n' +
      ']'))
  }

  get5DaysWeather(cityKey: string) {
    return this.http
      .get<any>(`${environment.accuweatherHost}/forecasts/v1/daily/5day/${cityKey}?apikey=${environment.accuweatherApiKey}&metric=true}`)
      .pipe(map(forecast => {
        forecast.DailyForecasts.forEach((daily: any) => {
          daily.iconLink = this.getSafeIconLink(daily.Day.Icon);
        })
        return forecast;
      }));

    return of(JSON.parse('{\n' +
      '    "Headline": {\n' +
      '        "EffectiveDate": "2022-07-09T08:00:00+03:00",\n' +
      '        "EffectiveEpochDate": 1657342800,\n' +
      '        "Severity": 4,\n' +
      '        "Text": "Pleasant this weekend",\n' +
      '        "Category": "mild",\n' +
      '        "EndDate": null,\n' +
      '        "EndEpochDate": null,\n' +
      '        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us",\n' +
      '        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"\n' +
      '    },\n' +
      '    "DailyForecasts": [\n' +
      '        {\n' +
      '            "Date": "2022-07-09T07:00:00+03:00",\n' +
      '            "EpochDate": 1657339200,\n' +
      '            "Sun": {\n' +
      '                "Rise": "2022-07-09T05:42:00+03:00",\n' +
      '                "EpochRise": 1657334520,\n' +
      '                "Set": "2022-07-09T19:50:00+03:00",\n' +
      '                "EpochSet": 1657385400\n' +
      '            },\n' +
      '            "Moon": {\n' +
      '                "Rise": "2022-07-09T15:18:00+03:00",\n' +
      '                "EpochRise": 1657369080,\n' +
      '                "Set": "2022-07-10T02:06:00+03:00",\n' +
      '                "EpochSet": 1657407960,\n' +
      '                "Phase": "WaxingGibbous",\n' +
      '                "Age": 10\n' +
      '            },\n' +
      '            "Temperature": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 22.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 31.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                }\n' +
      '            },\n' +
      '            "RealFeelTemperature": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 20.9,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Pleasant"\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 34.1,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Hot"\n' +
      '                }\n' +
      '            },\n' +
      '            "RealFeelTemperatureShade": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 20.9,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Pleasant"\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 29.8,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Very Warm"\n' +
      '                }\n' +
      '            },\n' +
      '            "HoursOfSun": 12.6,\n' +
      '            "DegreeDaySummary": {\n' +
      '                "Heating": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                },\n' +
      '                "Cooling": {\n' +
      '                    "Value": 8.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                }\n' +
      '            },\n' +
      '            "AirAndPollen": [\n' +
      '                {\n' +
      '                    "Name": "AirQuality",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Good",\n' +
      '                    "CategoryValue": 1,\n' +
      '                    "Type": "Ozone"\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Grass",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Mold",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Ragweed",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Tree",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "UVIndex",\n' +
      '                    "Value": 12,\n' +
      '                    "Category": "Extreme",\n' +
      '                    "CategoryValue": 5\n' +
      '                }\n' +
      '            ],\n' +
      '            "Day": {\n' +
      '                "Icon": 1,\n' +
      '                "IconPhrase": "Sunny",\n' +
      '                "HasPrecipitation": false,\n' +
      '                "ShortPhrase": "Sunny and nice",\n' +
      '                "LongPhrase": "Sunny and nice",\n' +
      '                "PrecipitationProbability": 0,\n' +
      '                "ThunderstormProbability": 0,\n' +
      '                "RainProbability": 0,\n' +
      '                "SnowProbability": 0,\n' +
      '                "IceProbability": 0,\n' +
      '                "Wind": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 14.8,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 273,\n' +
      '                        "Localized": "W",\n' +
      '                        "English": "W"\n' +
      '                    }\n' +
      '                },\n' +
      '                "WindGust": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 35.2,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 263,\n' +
      '                        "Localized": "W",\n' +
      '                        "English": "W"\n' +
      '                    }\n' +
      '                },\n' +
      '                "TotalLiquid": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Rain": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Snow": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "cm",\n' +
      '                    "UnitType": 4\n' +
      '                },\n' +
      '                "Ice": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "HoursOfPrecipitation": 0.0,\n' +
      '                "HoursOfRain": 0.0,\n' +
      '                "HoursOfSnow": 0.0,\n' +
      '                "HoursOfIce": 0.0,\n' +
      '                "CloudCover": 2,\n' +
      '                "Evapotranspiration": {\n' +
      '                    "Value": 6.3,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "SolarIrradiance": {\n' +
      '                    "Value": 13881.5,\n' +
      '                    "Unit": "W/m²",\n' +
      '                    "UnitType": 33\n' +
      '                }\n' +
      '            },\n' +
      '            "Night": {\n' +
      '                "Icon": 35,\n' +
      '                "IconPhrase": "Partly cloudy",\n' +
      '                "HasPrecipitation": false,\n' +
      '                "ShortPhrase": "Patchy clouds",\n' +
      '                "LongPhrase": "Patchy clouds",\n' +
      '                "PrecipitationProbability": 0,\n' +
      '                "ThunderstormProbability": 0,\n' +
      '                "RainProbability": 0,\n' +
      '                "SnowProbability": 0,\n' +
      '                "IceProbability": 0,\n' +
      '                "Wind": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 9.3,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 226,\n' +
      '                        "Localized": "SW",\n' +
      '                        "English": "SW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "WindGust": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 22.2,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 287,\n' +
      '                        "Localized": "WNW",\n' +
      '                        "English": "WNW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "TotalLiquid": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Rain": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Snow": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "cm",\n' +
      '                    "UnitType": 4\n' +
      '                },\n' +
      '                "Ice": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "HoursOfPrecipitation": 0.0,\n' +
      '                "HoursOfRain": 0.0,\n' +
      '                "HoursOfSnow": 0.0,\n' +
      '                "HoursOfIce": 0.0,\n' +
      '                "CloudCover": 38,\n' +
      '                "Evapotranspiration": {\n' +
      '                    "Value": 0.5,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "SolarIrradiance": {\n' +
      '                    "Value": 932.7,\n' +
      '                    "Unit": "W/m²",\n' +
      '                    "UnitType": 33\n' +
      '                }\n' +
      '            },\n' +
      '            "Sources": [\n' +
      '                "AccuWeather"\n' +
      '            ],\n' +
      '            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",\n' +
      '            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"\n' +
      '        },\n' +
      '        {\n' +
      '            "Date": "2022-07-10T07:00:00+03:00",\n' +
      '            "EpochDate": 1657425600,\n' +
      '            "Sun": {\n' +
      '                "Rise": "2022-07-10T05:42:00+03:00",\n' +
      '                "EpochRise": 1657420920,\n' +
      '                "Set": "2022-07-10T19:50:00+03:00",\n' +
      '                "EpochSet": 1657471800\n' +
      '            },\n' +
      '            "Moon": {\n' +
      '                "Rise": "2022-07-10T16:29:00+03:00",\n' +
      '                "EpochRise": 1657459740,\n' +
      '                "Set": "2022-07-11T02:51:00+03:00",\n' +
      '                "EpochSet": 1657497060,\n' +
      '                "Phase": "WaxingGibbous",\n' +
      '                "Age": 11\n' +
      '            },\n' +
      '            "Temperature": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 22.2,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 30.7,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                }\n' +
      '            },\n' +
      '            "RealFeelTemperature": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 20.8,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Pleasant"\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 34.2,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Hot"\n' +
      '                }\n' +
      '            },\n' +
      '            "RealFeelTemperatureShade": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 20.8,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Pleasant"\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 30.1,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Very Warm"\n' +
      '                }\n' +
      '            },\n' +
      '            "HoursOfSun": 12.0,\n' +
      '            "DegreeDaySummary": {\n' +
      '                "Heating": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                },\n' +
      '                "Cooling": {\n' +
      '                    "Value": 8.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                }\n' +
      '            },\n' +
      '            "AirAndPollen": [\n' +
      '                {\n' +
      '                    "Name": "AirQuality",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Good",\n' +
      '                    "CategoryValue": 1,\n' +
      '                    "Type": "Ozone"\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Grass",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Mold",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Ragweed",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Tree",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "UVIndex",\n' +
      '                    "Value": 12,\n' +
      '                    "Category": "Extreme",\n' +
      '                    "CategoryValue": 5\n' +
      '                }\n' +
      '            ],\n' +
      '            "Day": {\n' +
      '                "Icon": 2,\n' +
      '                "IconPhrase": "Mostly sunny",\n' +
      '                "HasPrecipitation": false,\n' +
      '                "ShortPhrase": "Mostly sunny and pleasant",\n' +
      '                "LongPhrase": "Mostly sunny and pleasant",\n' +
      '                "PrecipitationProbability": 0,\n' +
      '                "ThunderstormProbability": 0,\n' +
      '                "RainProbability": 0,\n' +
      '                "SnowProbability": 0,\n' +
      '                "IceProbability": 0,\n' +
      '                "Wind": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 18.5,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 266,\n' +
      '                        "Localized": "W",\n' +
      '                        "English": "W"\n' +
      '                    }\n' +
      '                },\n' +
      '                "WindGust": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 37.0,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 282,\n' +
      '                        "Localized": "WNW",\n' +
      '                        "English": "WNW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "TotalLiquid": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Rain": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Snow": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "cm",\n' +
      '                    "UnitType": 4\n' +
      '                },\n' +
      '                "Ice": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "HoursOfPrecipitation": 0.0,\n' +
      '                "HoursOfRain": 0.0,\n' +
      '                "HoursOfSnow": 0.0,\n' +
      '                "HoursOfIce": 0.0,\n' +
      '                "CloudCover": 13,\n' +
      '                "Evapotranspiration": {\n' +
      '                    "Value": 5.8,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "SolarIrradiance": {\n' +
      '                    "Value": 13480.4,\n' +
      '                    "Unit": "W/m²",\n' +
      '                    "UnitType": 33\n' +
      '                }\n' +
      '            },\n' +
      '            "Night": {\n' +
      '                "Icon": 35,\n' +
      '                "IconPhrase": "Partly cloudy",\n' +
      '                "HasPrecipitation": false,\n' +
      '                "ShortPhrase": "Patchy clouds",\n' +
      '                "LongPhrase": "Patchy clouds",\n' +
      '                "PrecipitationProbability": 1,\n' +
      '                "ThunderstormProbability": 0,\n' +
      '                "RainProbability": 1,\n' +
      '                "SnowProbability": 0,\n' +
      '                "IceProbability": 0,\n' +
      '                "Wind": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 11.1,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 290,\n' +
      '                        "Localized": "WNW",\n' +
      '                        "English": "WNW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "WindGust": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 20.4,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 304,\n' +
      '                        "Localized": "NW",\n' +
      '                        "English": "NW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "TotalLiquid": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Rain": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Snow": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "cm",\n' +
      '                    "UnitType": 4\n' +
      '                },\n' +
      '                "Ice": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "HoursOfPrecipitation": 0.0,\n' +
      '                "HoursOfRain": 0.0,\n' +
      '                "HoursOfSnow": 0.0,\n' +
      '                "HoursOfIce": 0.0,\n' +
      '                "CloudCover": 33,\n' +
      '                "Evapotranspiration": {\n' +
      '                    "Value": 0.8,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "SolarIrradiance": {\n' +
      '                    "Value": 1289.3,\n' +
      '                    "Unit": "W/m²",\n' +
      '                    "UnitType": 33\n' +
      '                }\n' +
      '            },\n' +
      '            "Sources": [\n' +
      '                "AccuWeather"\n' +
      '            ],\n' +
      '            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",\n' +
      '            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"\n' +
      '        },\n' +
      '        {\n' +
      '            "Date": "2022-07-11T07:00:00+03:00",\n' +
      '            "EpochDate": 1657512000,\n' +
      '            "Sun": {\n' +
      '                "Rise": "2022-07-11T05:43:00+03:00",\n' +
      '                "EpochRise": 1657507380,\n' +
      '                "Set": "2022-07-11T19:50:00+03:00",\n' +
      '                "EpochSet": 1657558200\n' +
      '            },\n' +
      '            "Moon": {\n' +
      '                "Rise": "2022-07-11T17:42:00+03:00",\n' +
      '                "EpochRise": 1657550520,\n' +
      '                "Set": "2022-07-12T03:46:00+03:00",\n' +
      '                "EpochSet": 1657586760,\n' +
      '                "Phase": "WaxingGibbous",\n' +
      '                "Age": 12\n' +
      '            },\n' +
      '            "Temperature": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 21.5,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 30.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                }\n' +
      '            },\n' +
      '            "RealFeelTemperature": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 20.3,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Pleasant"\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 33.5,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Hot"\n' +
      '                }\n' +
      '            },\n' +
      '            "RealFeelTemperatureShade": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 20.3,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Pleasant"\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 29.1,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Very Warm"\n' +
      '                }\n' +
      '            },\n' +
      '            "HoursOfSun": 12.5,\n' +
      '            "DegreeDaySummary": {\n' +
      '                "Heating": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                },\n' +
      '                "Cooling": {\n' +
      '                    "Value": 8.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                }\n' +
      '            },\n' +
      '            "AirAndPollen": [\n' +
      '                {\n' +
      '                    "Name": "AirQuality",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Good",\n' +
      '                    "CategoryValue": 1,\n' +
      '                    "Type": "Ozone"\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Grass",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Mold",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Ragweed",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Tree",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "UVIndex",\n' +
      '                    "Value": 12,\n' +
      '                    "Category": "Extreme",\n' +
      '                    "CategoryValue": 5\n' +
      '                }\n' +
      '            ],\n' +
      '            "Day": {\n' +
      '                "Icon": 1,\n' +
      '                "IconPhrase": "Sunny",\n' +
      '                "HasPrecipitation": false,\n' +
      '                "ShortPhrase": "Sunshine and pleasant",\n' +
      '                "LongPhrase": "Sunshine and pleasant",\n' +
      '                "PrecipitationProbability": 0,\n' +
      '                "ThunderstormProbability": 0,\n' +
      '                "RainProbability": 0,\n' +
      '                "SnowProbability": 0,\n' +
      '                "IceProbability": 0,\n' +
      '                "Wind": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 16.7,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 279,\n' +
      '                        "Localized": "W",\n' +
      '                        "English": "W"\n' +
      '                    }\n' +
      '                },\n' +
      '                "WindGust": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 35.2,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 288,\n' +
      '                        "Localized": "WNW",\n' +
      '                        "English": "WNW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "TotalLiquid": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Rain": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Snow": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "cm",\n' +
      '                    "UnitType": 4\n' +
      '                },\n' +
      '                "Ice": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "HoursOfPrecipitation": 0.0,\n' +
      '                "HoursOfRain": 0.0,\n' +
      '                "HoursOfSnow": 0.0,\n' +
      '                "HoursOfIce": 0.0,\n' +
      '                "CloudCover": 7,\n' +
      '                "Evapotranspiration": {\n' +
      '                    "Value": 6.1,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "SolarIrradiance": {\n' +
      '                    "Value": 14505.0,\n' +
      '                    "Unit": "W/m²",\n' +
      '                    "UnitType": 33\n' +
      '                }\n' +
      '            },\n' +
      '            "Night": {\n' +
      '                "Icon": 34,\n' +
      '                "IconPhrase": "Mostly clear",\n' +
      '                "HasPrecipitation": false,\n' +
      '                "ShortPhrase": "Clear to partly cloudy",\n' +
      '                "LongPhrase": "Clear to partly cloudy",\n' +
      '                "PrecipitationProbability": 0,\n' +
      '                "ThunderstormProbability": 0,\n' +
      '                "RainProbability": 0,\n' +
      '                "SnowProbability": 0,\n' +
      '                "IceProbability": 0,\n' +
      '                "Wind": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 7.4,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 244,\n' +
      '                        "Localized": "WSW",\n' +
      '                        "English": "WSW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "WindGust": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 22.2,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 310,\n' +
      '                        "Localized": "NW",\n' +
      '                        "English": "NW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "TotalLiquid": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Rain": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Snow": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "cm",\n' +
      '                    "UnitType": 4\n' +
      '                },\n' +
      '                "Ice": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "HoursOfPrecipitation": 0.0,\n' +
      '                "HoursOfRain": 0.0,\n' +
      '                "HoursOfSnow": 0.0,\n' +
      '                "HoursOfIce": 0.0,\n' +
      '                "CloudCover": 19,\n' +
      '                "Evapotranspiration": {\n' +
      '                    "Value": 0.5,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "SolarIrradiance": {\n' +
      '                    "Value": 1279.7,\n' +
      '                    "Unit": "W/m²",\n' +
      '                    "UnitType": 33\n' +
      '                }\n' +
      '            },\n' +
      '            "Sources": [\n' +
      '                "AccuWeather"\n' +
      '            ],\n' +
      '            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",\n' +
      '            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"\n' +
      '        },\n' +
      '        {\n' +
      '            "Date": "2022-07-12T07:00:00+03:00",\n' +
      '            "EpochDate": 1657598400,\n' +
      '            "Sun": {\n' +
      '                "Rise": "2022-07-12T05:43:00+03:00",\n' +
      '                "EpochRise": 1657593780,\n' +
      '                "Set": "2022-07-12T19:49:00+03:00",\n' +
      '                "EpochSet": 1657644540\n' +
      '            },\n' +
      '            "Moon": {\n' +
      '                "Rise": "2022-07-12T18:53:00+03:00",\n' +
      '                "EpochRise": 1657641180,\n' +
      '                "Set": "2022-07-13T04:50:00+03:00",\n' +
      '                "EpochSet": 1657677000,\n' +
      '                "Phase": "WaxingGibbous",\n' +
      '                "Age": 13\n' +
      '            },\n' +
      '            "Temperature": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 22.6,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 30.6,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                }\n' +
      '            },\n' +
      '            "RealFeelTemperature": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 21.7,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Pleasant"\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 34.6,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Hot"\n' +
      '                }\n' +
      '            },\n' +
      '            "RealFeelTemperatureShade": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 21.7,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Pleasant"\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 30.1,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Very Warm"\n' +
      '                }\n' +
      '            },\n' +
      '            "HoursOfSun": 12.9,\n' +
      '            "DegreeDaySummary": {\n' +
      '                "Heating": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                },\n' +
      '                "Cooling": {\n' +
      '                    "Value": 9.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                }\n' +
      '            },\n' +
      '            "AirAndPollen": [\n' +
      '                {\n' +
      '                    "Name": "AirQuality",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Good",\n' +
      '                    "CategoryValue": 1,\n' +
      '                    "Type": "Ozone"\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Grass",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Mold",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Ragweed",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Tree",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "UVIndex",\n' +
      '                    "Value": 12,\n' +
      '                    "Category": "Extreme",\n' +
      '                    "CategoryValue": 5\n' +
      '                }\n' +
      '            ],\n' +
      '            "Day": {\n' +
      '                "Icon": 1,\n' +
      '                "IconPhrase": "Sunny",\n' +
      '                "HasPrecipitation": false,\n' +
      '                "ShortPhrase": "Brilliant sunshine and nice",\n' +
      '                "LongPhrase": "Brilliant sunshine and nice",\n' +
      '                "PrecipitationProbability": 0,\n' +
      '                "ThunderstormProbability": 0,\n' +
      '                "RainProbability": 0,\n' +
      '                "SnowProbability": 0,\n' +
      '                "IceProbability": 0,\n' +
      '                "Wind": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 14.8,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 279,\n' +
      '                        "Localized": "W",\n' +
      '                        "English": "W"\n' +
      '                    }\n' +
      '                },\n' +
      '                "WindGust": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 35.2,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 298,\n' +
      '                        "Localized": "WNW",\n' +
      '                        "English": "WNW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "TotalLiquid": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Rain": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Snow": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "cm",\n' +
      '                    "UnitType": 4\n' +
      '                },\n' +
      '                "Ice": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "HoursOfPrecipitation": 0.0,\n' +
      '                "HoursOfRain": 0.0,\n' +
      '                "HoursOfSnow": 0.0,\n' +
      '                "HoursOfIce": 0.0,\n' +
      '                "CloudCover": 2,\n' +
      '                "Evapotranspiration": {\n' +
      '                    "Value": 6.1,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "SolarIrradiance": {\n' +
      '                    "Value": 15629.1,\n' +
      '                    "Unit": "W/m²",\n' +
      '                    "UnitType": 33\n' +
      '                }\n' +
      '            },\n' +
      '            "Night": {\n' +
      '                "Icon": 34,\n' +
      '                "IconPhrase": "Mostly clear",\n' +
      '                "HasPrecipitation": false,\n' +
      '                "ShortPhrase": "Clear to partly cloudy",\n' +
      '                "LongPhrase": "Clear to partly cloudy",\n' +
      '                "PrecipitationProbability": 0,\n' +
      '                "ThunderstormProbability": 0,\n' +
      '                "RainProbability": 0,\n' +
      '                "SnowProbability": 0,\n' +
      '                "IceProbability": 0,\n' +
      '                "Wind": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 7.4,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 298,\n' +
      '                        "Localized": "WNW",\n' +
      '                        "English": "WNW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "WindGust": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 24.1,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 337,\n' +
      '                        "Localized": "NNW",\n' +
      '                        "English": "NNW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "TotalLiquid": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Rain": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Snow": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "cm",\n' +
      '                    "UnitType": 4\n' +
      '                },\n' +
      '                "Ice": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "HoursOfPrecipitation": 0.0,\n' +
      '                "HoursOfRain": 0.0,\n' +
      '                "HoursOfSnow": 0.0,\n' +
      '                "HoursOfIce": 0.0,\n' +
      '                "CloudCover": 22,\n' +
      '                "Evapotranspiration": {\n' +
      '                    "Value": 0.5,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "SolarIrradiance": {\n' +
      '                    "Value": 1186.1,\n' +
      '                    "Unit": "W/m²",\n' +
      '                    "UnitType": 33\n' +
      '                }\n' +
      '            },\n' +
      '            "Sources": [\n' +
      '                "AccuWeather"\n' +
      '            ],\n' +
      '            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",\n' +
      '            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"\n' +
      '        },\n' +
      '        {\n' +
      '            "Date": "2022-07-13T07:00:00+03:00",\n' +
      '            "EpochDate": 1657684800,\n' +
      '            "Sun": {\n' +
      '                "Rise": "2022-07-13T05:44:00+03:00",\n' +
      '                "EpochRise": 1657680240,\n' +
      '                "Set": "2022-07-13T19:49:00+03:00",\n' +
      '                "EpochSet": 1657730940\n' +
      '            },\n' +
      '            "Moon": {\n' +
      '                "Rise": "2022-07-13T19:58:00+03:00",\n' +
      '                "EpochRise": 1657731480,\n' +
      '                "Set": "2022-07-14T06:02:00+03:00",\n' +
      '                "EpochSet": 1657767720,\n' +
      '                "Phase": "Full",\n' +
      '                "Age": 14\n' +
      '            },\n' +
      '            "Temperature": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 23.1,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 31.3,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                }\n' +
      '            },\n' +
      '            "RealFeelTemperature": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 22.1,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Pleasant"\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 35.9,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Hot"\n' +
      '                }\n' +
      '            },\n' +
      '            "RealFeelTemperatureShade": {\n' +
      '                "Minimum": {\n' +
      '                    "Value": 22.1,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Pleasant"\n' +
      '                },\n' +
      '                "Maximum": {\n' +
      '                    "Value": 31.7,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17,\n' +
      '                    "Phrase": "Hot"\n' +
      '                }\n' +
      '            },\n' +
      '            "HoursOfSun": 11.7,\n' +
      '            "DegreeDaySummary": {\n' +
      '                "Heating": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                },\n' +
      '                "Cooling": {\n' +
      '                    "Value": 9.0,\n' +
      '                    "Unit": "C",\n' +
      '                    "UnitType": 17\n' +
      '                }\n' +
      '            },\n' +
      '            "AirAndPollen": [\n' +
      '                {\n' +
      '                    "Name": "AirQuality",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Good",\n' +
      '                    "CategoryValue": 1,\n' +
      '                    "Type": "Ozone"\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Grass",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Mold",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Ragweed",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "Tree",\n' +
      '                    "Value": 0,\n' +
      '                    "Category": "Low",\n' +
      '                    "CategoryValue": 1\n' +
      '                },\n' +
      '                {\n' +
      '                    "Name": "UVIndex",\n' +
      '                    "Value": 12,\n' +
      '                    "Category": "Extreme",\n' +
      '                    "CategoryValue": 5\n' +
      '                }\n' +
      '            ],\n' +
      '            "Day": {\n' +
      '                "Icon": 1,\n' +
      '                "IconPhrase": "Sunny",\n' +
      '                "HasPrecipitation": false,\n' +
      '                "ShortPhrase": "Sunny and pleasant",\n' +
      '                "LongPhrase": "Sunny and pleasant",\n' +
      '                "PrecipitationProbability": 0,\n' +
      '                "ThunderstormProbability": 0,\n' +
      '                "RainProbability": 0,\n' +
      '                "SnowProbability": 0,\n' +
      '                "IceProbability": 0,\n' +
      '                "Wind": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 14.8,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 281,\n' +
      '                        "Localized": "W",\n' +
      '                        "English": "W"\n' +
      '                    }\n' +
      '                },\n' +
      '                "WindGust": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 37.0,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 300,\n' +
      '                        "Localized": "WNW",\n' +
      '                        "English": "WNW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "TotalLiquid": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Rain": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Snow": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "cm",\n' +
      '                    "UnitType": 4\n' +
      '                },\n' +
      '                "Ice": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "HoursOfPrecipitation": 0.0,\n' +
      '                "HoursOfRain": 0.0,\n' +
      '                "HoursOfSnow": 0.0,\n' +
      '                "HoursOfIce": 0.0,\n' +
      '                "CloudCover": 8,\n' +
      '                "Evapotranspiration": {\n' +
      '                    "Value": 5.8,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "SolarIrradiance": {\n' +
      '                    "Value": 15671.3,\n' +
      '                    "Unit": "W/m²",\n' +
      '                    "UnitType": 33\n' +
      '                }\n' +
      '            },\n' +
      '            "Night": {\n' +
      '                "Icon": 38,\n' +
      '                "IconPhrase": "Mostly cloudy",\n' +
      '                "HasPrecipitation": false,\n' +
      '                "ShortPhrase": "Mostly cloudy",\n' +
      '                "LongPhrase": "Mostly cloudy",\n' +
      '                "PrecipitationProbability": 0,\n' +
      '                "ThunderstormProbability": 0,\n' +
      '                "RainProbability": 0,\n' +
      '                "SnowProbability": 0,\n' +
      '                "IceProbability": 0,\n' +
      '                "Wind": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 9.3,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 273,\n' +
      '                        "Localized": "W",\n' +
      '                        "English": "W"\n' +
      '                    }\n' +
      '                },\n' +
      '                "WindGust": {\n' +
      '                    "Speed": {\n' +
      '                        "Value": 22.2,\n' +
      '                        "Unit": "km/h",\n' +
      '                        "UnitType": 7\n' +
      '                    },\n' +
      '                    "Direction": {\n' +
      '                        "Degrees": 212,\n' +
      '                        "Localized": "SSW",\n' +
      '                        "English": "SSW"\n' +
      '                    }\n' +
      '                },\n' +
      '                "TotalLiquid": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Rain": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "Snow": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "cm",\n' +
      '                    "UnitType": 4\n' +
      '                },\n' +
      '                "Ice": {\n' +
      '                    "Value": 0.0,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "HoursOfPrecipitation": 0.0,\n' +
      '                "HoursOfRain": 0.0,\n' +
      '                "HoursOfSnow": 0.0,\n' +
      '                "HoursOfIce": 0.0,\n' +
      '                "CloudCover": 39,\n' +
      '                "Evapotranspiration": {\n' +
      '                    "Value": 0.5,\n' +
      '                    "Unit": "mm",\n' +
      '                    "UnitType": 3\n' +
      '                },\n' +
      '                "SolarIrradiance": {\n' +
      '                    "Value": 932.3,\n' +
      '                    "Unit": "W/m²",\n' +
      '                    "UnitType": 33\n' +
      '                }\n' +
      '            },\n' +
      '            "Sources": [\n' +
      '                "AccuWeather"\n' +
      '            ],\n' +
      '            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",\n' +
      '            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us"\n' +
      '        }\n' +
      '    ]\n' +
      '}')).pipe(map(forecast => {
      forecast.DailyForecasts.forEach((daily: any) => {
        daily.iconLink = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.accuweather.com//images/weathericons/${daily.Day.Icon}.svg`);
      })
      return forecast;
    }))
  }

  getAutoComplete(q: any) {

    return this.http
      .get(`${environment.accuweatherHost}/locations/v1/cities/autocomplete?apikey=${environment.accuweatherApiKey}&q=${q}`);

    return of(JSON.parse('[\n' +
      '    {\n' +
      '        "Version": 1,\n' +
      '        "Key": "215854",\n' +
      '        "Type": "City",\n' +
      '        "Rank": 31,\n' +
      '        "LocalizedName": "Tel Aviv",\n' +
      '        "Country": {\n' +
      '            "ID": "IL",\n' +
      '            "LocalizedName": "Israel"\n' +
      '        },\n' +
      '        "AdministrativeArea": {\n' +
      '            "ID": "TA",\n' +
      '            "LocalizedName": "Tel Aviv"\n' +
      '        }\n' +
      '    },\n' +
      '    {\n' +
      '        "Version": 1,\n' +
      '        "Key": "3431644",\n' +
      '        "Type": "City",\n' +
      '        "Rank": 45,\n' +
      '        "LocalizedName": "Telanaipura",\n' +
      '        "Country": {\n' +
      '            "ID": "ID",\n' +
      '            "LocalizedName": "Indonesia"\n' +
      '        },\n' +
      '        "AdministrativeArea": {\n' +
      '            "ID": "JA",\n' +
      '            "LocalizedName": "Jambi"\n' +
      '        }\n' +
      '    },\n' +
      '    {\n' +
      '        "Version": 1,\n' +
      '        "Key": "300558",\n' +
      '        "Type": "City",\n' +
      '        "Rank": 45,\n' +
      '        "LocalizedName": "Telok Blangah New Town",\n' +
      '        "Country": {\n' +
      '            "ID": "SG",\n' +
      '            "LocalizedName": "Singapore"\n' +
      '        },\n' +
      '        "AdministrativeArea": {\n' +
      '            "ID": "05",\n' +
      '            "LocalizedName": "South West"\n' +
      '        }\n' +
      '    },\n' +
      '    {\n' +
      '        "Version": 1,\n' +
      '        "Key": "325876",\n' +
      '        "Type": "City",\n' +
      '        "Rank": 51,\n' +
      '        "LocalizedName": "Telford",\n' +
      '        "Country": {\n' +
      '            "ID": "GB",\n' +
      '            "LocalizedName": "United Kingdom"\n' +
      '        },\n' +
      '        "AdministrativeArea": {\n' +
      '            "ID": "TFW",\n' +
      '            "LocalizedName": "Telford and Wrekin"\n' +
      '        }\n' +
      '    },\n' +
      '    {\n' +
      '        "Version": 1,\n' +
      '        "Key": "169072",\n' +
      '        "Type": "City",\n' +
      '        "Rank": 51,\n' +
      '        "LocalizedName": "Telavi",\n' +
      '        "Country": {\n' +
      '            "ID": "GE",\n' +
      '            "LocalizedName": "Georgia"\n' +
      '        },\n' +
      '        "AdministrativeArea": {\n' +
      '            "ID": "KA",\n' +
      '            "LocalizedName": "Kakheti"\n' +
      '        }\n' +
      '    },\n' +
      '    {\n' +
      '        "Version": 1,\n' +
      '        "Key": "230611",\n' +
      '        "Type": "City",\n' +
      '        "Rank": 51,\n' +
      '        "LocalizedName": "Telsiai",\n' +
      '        "Country": {\n' +
      '            "ID": "LT",\n' +
      '            "LocalizedName": "Lithuania"\n' +
      '        },\n' +
      '        "AdministrativeArea": {\n' +
      '            "ID": "TE",\n' +
      '            "LocalizedName": "Telšiai"\n' +
      '        }\n' +
      '    },\n' +
      '    {\n' +
      '        "Version": 1,\n' +
      '        "Key": "2723742",\n' +
      '        "Type": "City",\n' +
      '        "Rank": 55,\n' +
      '        "LocalizedName": "Telégrafo",\n' +
      '        "Country": {\n' +
      '            "ID": "BR",\n' +
      '            "LocalizedName": "Brazil"\n' +
      '        },\n' +
      '        "AdministrativeArea": {\n' +
      '            "ID": "PA",\n' +
      '            "LocalizedName": "Pará"\n' +
      '        }\n' +
      '    },\n' +
      '    {\n' +
      '        "Version": 1,\n' +
      '        "Key": "186933",\n' +
      '        "Type": "City",\n' +
      '        "Rank": 55,\n' +
      '        "LocalizedName": "Tela",\n' +
      '        "Country": {\n' +
      '            "ID": "HN",\n' +
      '            "LocalizedName": "Honduras"\n' +
      '        },\n' +
      '        "AdministrativeArea": {\n' +
      '            "ID": "AT",\n' +
      '            "LocalizedName": "Atlántida"\n' +
      '        }\n' +
      '    },\n' +
      '    {\n' +
      '        "Version": 1,\n' +
      '        "Key": "3453754",\n' +
      '        "Type": "City",\n' +
      '        "Rank": 55,\n' +
      '        "LocalizedName": "Telaga Asih",\n' +
      '        "Country": {\n' +
      '            "ID": "ID",\n' +
      '            "LocalizedName": "Indonesia"\n' +
      '        },\n' +
      '        "AdministrativeArea": {\n' +
      '            "ID": "JB",\n' +
      '            "LocalizedName": "West Java"\n' +
      '        }\n' +
      '    },\n' +
      '    {\n' +
      '        "Version": 1,\n' +
      '        "Key": "3453755",\n' +
      '        "Type": "City",\n' +
      '        "Rank": 55,\n' +
      '        "LocalizedName": "Telagamurni",\n' +
      '        "Country": {\n' +
      '            "ID": "ID",\n' +
      '            "LocalizedName": "Indonesia"\n' +
      '        },\n' +
      '        "AdministrativeArea": {\n' +
      '            "ID": "JB",\n' +
      '            "LocalizedName": "West Java"\n' +
      '        }\n' +
      '    }\n' +
      ']').filter((c:any) => c.LocalizedName.toLowerCase().includes((typeof q === 'string' ? q : q.LocalizedName).toLowerCase())))
  }

  addFavorites(city: any) {
    // @ts-ignore
    // const favorite = this._favorites[city.key];
    this._favorites[city.Key] = city;
    localStorage.setItem(this.favoritesKey, JSON.stringify(this._favorites));
  }

  removeFavorites(city: any) {
    // @ts-ignore
    delete this._favorites[city.Key];
    localStorage.setItem(this.favoritesKey, JSON.stringify(this._favorites));
  }

  isFavorite(city: any): boolean {
    // @ts-ignore
    return !!this._favorites[city.Key];
  }

  getFavorites() {
    return this._favorites;
  }
}
