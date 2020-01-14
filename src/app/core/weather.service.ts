import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Weather} from '../shared/models/weather';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather?';
  private readonly apikey: string = '&appid=a9b50d1fa06de3dac819e17918fb3f5e';
  private readonly appendix: string = 'q=';
  private data: Observable<Weather[]>;

  constructor(private httpClient: HttpClient) { }

  public all(limit: string = 'London'): Observable<any> {
    const url: string = this.baseUrl + this.appendix + limit + this.apikey;

    console.log('UserService.all(): HTTP GET "' + url + '"');
    // return(this.httpClient.get(url));
    return(this.httpClient.get(url).pipe(
        map((data: any) => {
          console.log(data);
          const weatherA: Array<Weather> = new Array<Weather>();
          data.results.forEach((item) => {
            // parse item/JSON into user
            const weather: Weather = Weather.fromJS(item);
            if (weather != null) {
              weatherA.push(weather);
            }
          });
          this.data = of(weatherA);
          return(weatherA);
        })
    ));
  }
  public get(id: string): Observable<Weather> {
    const url: string = this.baseUrl + '?nat=US&seed=' + this.apikey;
    console.log('UserService.get(' + id + '): HTTP GET "' + url + '"');
    return((this.data || this.all()).pipe(
        map((weather) => weather.find((w) => w.id === id))
    ));
  }
}
