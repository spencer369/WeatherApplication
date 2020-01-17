import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Subscription} from 'rxjs';
import {Weather} from '../shared/models/weather';
import {WeatherService} from '../core/weather.service';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
  private weather: Weather;
  private name: string;
  private location: Coordinates;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router,
              private weatherService: WeatherService,
              private geolocation: Geolocation,
              private alertController: AlertController,
              private navCtrl: NavController) {
    this.subscription = new Subscription();
    this.subscription.add(
        this.route.params.subscribe(params => {
          this.name = params.locationNameForecast;
          if (this.router.getCurrentNavigation().extras.state) {
            this.weather = this.router.getCurrentNavigation().extras.state as Weather;
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getConditions(weather) {
    if (this.weather === null) {
      return('');
    }
    switch (this.weather.conditionsForecast.toLowerCase()) {
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

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = resp.coords;
    }).catch((error) => {
      this.location = null;
      console.log('Failed to get current location. Error: ' + error);
    });
  }

}
