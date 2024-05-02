import { Observable } from 'rxjs';
import { WeatherService } from './../weather.service';
import { Component } from '@angular/core';
import { Forecast, Weather } from '../weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {

  weather: Weather | undefined;
  forecast$: Observable<Forecast[]> | undefined

  constructor(private ws: WeatherService){}

  search(city: string) {
    this.ws.getWeather(city).subscribe(weather => this.weather = weather);
    this.forecast$ = this.ws.getForecast(city);
  }




}
