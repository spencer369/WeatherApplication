import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('WeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });

  describe('all', () => {
    it('should return weather for a city', (done) => {
      const service: WeatherService = TestBed.get(WeatherService);
      service.all().subscribe((weatherA) => {
        expect(weatherA).toBeTruthy();
        expect(weatherA.length).toBeGreaterThanOrEqual(1);
        done();
      });
    });
  });
});
