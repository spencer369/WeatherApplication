import { Component, OnInit } from '@angular/core';
import { Weather } from '../shared/models/weather';
import {WeatherService} from '../core/weather.service';
// import {Settings} from 'http2';
import {Subscription} from 'rxjs';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  readonly DefaultContactLimit: number = 10;
  readonly MaximumContactLimit: number = 2500;
  private weatherA: Weather[];
  private range = '0';
  private subscription: Subscription;
  private dataSubscription: Subscription;
  // private settings: Settings;
  private location: Coordinates;

  constructor(private userService: WeatherService,
              private geolocation: Geolocation,
              private navCtrl: NavController) {
    this.subscription = new Subscription();
  }

  handleFilter(event: Event) {
    // this.refresh();
  }

  /*ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }*/

  /*displayDistance(distance: number) {
    return(parseInt(String(distance), 10));
  }

  applyRangeFilter(users: Array<User>, limit?: number, location?: Coordinates, range?: number): Array<User> {
    range = range || parseInt(this.range, 10);
    location = location || this.location;
    limit = limit || this.settings.contactLimit || this.DefaultContactLimit;

    if (location && range) {
      users = users.filter((user) => {
        return(user.address.distanceFrom(location.latitude, location.longitude) <= range);
      });
    }
    return(users.slice(0, limit));
  }

  refresh(limit?: number) {
    this.geolocation.getCurrentPosition().then((resp) => {
      // Filter or update our list of users
      this.location = resp.coords;
    }).finally(() => {
      this.subscription.remove(this.dataSubscription);

      // if limiting to a range, grab the first 2500 records
      // we have to filter our data here client side
      const range: number = parseInt(this.range, 10);
      const adjustedLimit: number = (! range)
          ? (limit || this.settings.contactLimit || this.DefaultContactLimit)
          : this.MaximumContactLimit;
      this.dataSubscription = this.userService.all(adjustedLimit).subscribe((users) => {
        this.users = this.applyRangeFilter(users, limit, this.location, range);
      });
      this.subscription.add(this.dataSubscription);
    });
  }*/

  ngOnInit() {
    /*this.subscription.add(
        this.profileService.get().subscribe((settings) => {
          this.settings = settings || new Settings();
          this.refresh(this.settings.contactLimit);
        })
    );*/
  }

  /*displayUserDetail(user: User) {
    this.navCtrl.navigateForward( ['/detail/' + user.id], {
      state: user
    });
  }*/
}
