import {Component, OnInit} from '@angular/core';
import {Weather} from '../shared/models/weather';
import {Subscription} from 'rxjs';
import {WeatherService} from '../core/weather.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-current',
  templateUrl: './current.page.html',
  styleUrls: ['./current.page.scss'],
})
export class CurrentPage implements OnInit {
  private weatherA: Weather;
  private range = '0';
  private locationSelectOption: string;
  private subscription: Subscription;
  private dataSubscription: Subscription;
  private currentZipcode: string;
  private currentLatitude: number;
  private currentLongitude: number;
  private currentCity: string;
  private currentCountry: string;
  private weatherIconName: string;
  private location: Coordinates;

  constructor(private weatherService: WeatherService,
              private geolocation: Geolocation,
              private navCtrl: NavController) {

    this.subscription = new Subscription();
  }

  handleFilter($event: Event) {
    const target = $event.target as HTMLTextAreaElement;
    this.locationSelectOption = target.value;
  }

  submitZipCode($event: Event) {
    console.log($event);
    this.weatherService.currentForZipcode(this.currentZipcode).subscribe((weatherA) => {
      this.weatherA = weatherA;
    });
  }
  submitGeolocation($event: Event) {
    this.weatherService.currentForGeolocation(this.currentLatitude, this.currentLongitude).subscribe((weatherA) => {
      this.weatherA = weatherA;
    });
  }
  submitCity($event: Event) {
    console.log($event);
    this.weatherService.currentForCity(this.currentCity, this.currentCountry).subscribe((weatherA) => {
      this.weatherA = weatherA;
    });
  }

  getConditions(weather) {
    if (this.weatherA === null) {
      return('');
    }
    switch (this.weatherA.conditions.toLowerCase()) {
      case 'clouds':
        return 'cloud';
      case 'rain':
        return 'rainy';
      case 'clear':
        return 'sunny';
      default:
        return 'umbrella';
    }
  }

  ngOnInit() {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.location = resp.coords;
        console.log('resp ' , this.location);
        this.weatherService.currentForGeolocation(this.location.latitude, this.location.longitude).subscribe((weatherA) => {
          this.weatherA = weatherA;
        });
      });
  }

  displayUserDetail(weather: Weather) {
    this.navCtrl.navigateForward( ['/detail/' + weather.date], {
      state: weather
    });
  }

}
