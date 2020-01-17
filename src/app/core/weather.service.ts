import { Injectable } from '@angular/core';
import {ObjectUnsubscribedError, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Weather} from '../shared/models/weather';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly currentUrl: string = 'https://api.openweathermap.org/data/2.5/weather?';
  private readonly forecastUrl: string = 'https://api.openweathermap.org/data/2.5/forecast?';
  private readonly apikey: string = '&appid=a9b50d1fa06de3dac819e17918fb3f5e';
  public zipcode: string;
  private data: Observable<Weather[]>;

  constructor(private httpClient: HttpClient) { }

  public currentForZipcode(zipcode: string): Observable<Weather> {
    const url: string = this.currentUrl + 'zip=' + zipcode + this.apikey;
    console.log('WeatherService.currentForZipcode(' + zipcode + '): HTTP GET "' + url + '"');
    return(this.current(url));
  }
  public currentForGeolocation(latitude: number, longitude: number): Observable<Weather> {
    const url: string = this.currentUrl + 'lat=' + latitude + '&lon=' + longitude + this.apikey;
    console.log('WeatherService.currentForGeolocation(' + latitude + ',' + longitude + '): HTTP GET "' + url + '"');
    return(this.current(url));
  }
  public currentForCity(city: string, country: string): Observable<Weather> {
      const url: string = this.currentUrl + 'q=' + city + ',' + country + this.apikey;
      console.log('WeatherService.currentForCity(' + name + '): HTTP GET "' + url + '"');
      return(this.current(url));
  }

  private current(url: string): Observable<any> {
    return(this.httpClient.get(url).pipe(
        map((data) => {
          console.log(data);
          const weather = Weather.fromCurrentJS(data);
          return(weather);
        })
    ));
  }

    public forecastForZipcode(zipcode: string): Observable<Weather[]> {
        this.zipcode = zipcode;
        const url: string = this.forecastUrl + 'zip=' + zipcode + this.apikey;
        console.log('WeatherService.forecastForZipcode(' + zipcode + '): HTTP GET "' + url + '"');
        return(this.forecast(url));
    }
    public forecastForCity(city: string, country: string): Observable<Weather[]> {
      const url: string = this.forecastUrl + 'q=' + city + ',' + country + this.apikey;
      console.log('WeatherService.forecastForGeolocation(' + name + '): HTTP GET "' + url + '"');
      return(this.forecast(url));
    }
    public forecastForGeolocation(latitude: number, longitude: number): Observable<Weather[]> {
        const url: string = this.forecastUrl + 'lat=' + latitude + '&lon=' + longitude + this.apikey;
        console.log('WeatherService.forecastForGeolocation(' + latitude + ',' + longitude + '): HTTP GET "' + url + '"');
        return(this.forecast(url));
    }

    public forecast(url: string): Observable<any> {
        return (this.httpClient.get(url).pipe(
            map((data: any) => {
                const weatherA: Array<Weather> = new Array<Weather>();
                data.list.forEach((item) => {
                    // parse item/JSON into user
                    const weather: Weather = Weather.fromForecastJS(item);
                    if (weather != null) {
                        weatherA.push(weather);
                    }
                });
                this.data = of(weatherA);
                return (weatherA);
            })
        ));
    }
}
