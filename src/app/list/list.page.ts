import { Component, OnInit } from '@angular/core';
import { Weather } from '../shared/models/weather';
import {WeatherService} from '../core/weather.service';
// import {Settings} from 'http2';
import {Subscription} from 'rxjs';
import {NavController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private currentZipcode: string;
  private currentLatitude: number;
  private currentLongitude: number;
  private currentCity: string;
  private currentCountry: string;
  private locationSelectOption: string;
  private weatherA: Weather[];
  private weather: Weather;
  private range = '0';
  private subscription: Subscription;
  private dataSubscription: Subscription;
  private name: string;
  // private settings: Settings;
  private location: Coordinates;
  // private weather: Weather;

  constructor(private weatherService: WeatherService,
              private geolocation: Geolocation,
              private navCtrl: NavController) {
    this.subscription = new Subscription();
  }

  handleFilter($event: Event) {
    this.locationSelectOption = $event.target.value;
  }

  getConditions(weather) {
    if (this.weather === null) {
      return('');
    }
    console.log(weather.conditionsForecast);
    switch (weather.conditionsForecast.toLowerCase()) {
      case 'clouds':
        return 'cloud';
      case 'rain':
        return 'rainy';
      case 'clear':
        return 'sunny';
      case 'snow':
        return 'snow';
      default:
        return 'umbrella';
    }
  }

  submitZipCode($event: Event) {
    console.log($event);
    this.weatherService.forecastForZipcode(this.currentZipcode).subscribe((weatherA) => {
      this.weatherA = weatherA;
    });
    this.weatherService.currentForZipcode(this.currentZipcode).subscribe((weatherA) => {
      this.weather = weatherA;
    });
  }
  submitGeolocation($event: Event) {
    this.weatherService.forecastForGeolocation(this.currentLatitude, this.currentLongitude).subscribe((weatherA) => {
      this.weatherA = weatherA;
    });
    this.weatherService.currentForGeolocation(this.currentLatitude, this.currentLongitude).subscribe((weatherA) => {
      this.weather = weatherA;
    });
  }
  submitCity($event: Event) {
    console.log($event);
    this.weatherService.forecastForCity(this.currentCity, this.currentCountry).subscribe((weatherA) => {
      this.weatherA = weatherA;
    });
    this.weatherService.currentForCity(this.currentCity, this.currentCountry).subscribe((weatherA) => {
      this.weather = weatherA;
    });
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = resp.coords;
      console.log('resp ', this.location);
      this.weatherService.forecastForGeolocation(this.location.latitude, this.location.longitude).subscribe((weatherA) => {
        this.weatherA = weatherA;
      });
      this.weatherService.currentForGeolocation(this.location.latitude, this.location.longitude).subscribe((weatherA) => {
        this.weather = weatherA;
      });
    });
  }

  displayUserDetail(weather: Weather) {
    this.navCtrl.navigateForward( ['./detail/' + weather.locationNameForecast], {
      state: weather
    });
  }
}
