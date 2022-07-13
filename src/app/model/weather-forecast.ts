import {SafeResourceUrl} from "@angular/platform-browser";

export interface WeatherForecast {
  Headline: {
    Text: string
  };
  DailyForecasts: Weather[];
}

export interface City {
  Key: string;
  LocalizedName: string;
  IsFavorite: boolean;
}

export interface Weather {
  Date: Date;
  Day: {
    Icon: number;
    LongPhrase: string;
  }

  Temperature: {
    Maximum: {
      Value: string;
    }
    Minimum: {
      Value: string;
    }
  }

  IconLink: SafeResourceUrl;
}

export interface CurrentWeather {
  Date: Date;
  WeatherText: string;
  Temperature: {
    Metric: {
      Value: string;
    }
    Imperial: {
      Value: string;
    }
  };
  IconLink: SafeResourceUrl;
}

// export class WeatherDay {
//   date: Date;
//
// }
//
// export class Temperature {
//
// }
