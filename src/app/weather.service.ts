import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Forecast, Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {



  constructor(private http: HttpClient) { }

  private apiUrl = 'https://api.openweathermap.org/data/2.5/';
  private apiKey = '8ba0216aeeb43675713067338c7ae60b';

getWeather(city: string): Observable<Weather> {
  const options = new HttpParams()
    .set('units', 'metric')
    .set('q', city)
    .set('appId', this.apiKey);
  return this.http.get<Weather>(this.apiUrl + 'weather', { params: options });
}
getForecast(city: string): Observable<Forecast[]> {
  return this.http.get<{ list: Forecast[]}>(this.apiUrl + 'forecast', { params: this.getOptions(city) }).pipe(
    map((data: { list: Forecast[] }) => data.list.filter(forecast => forecast.dt_txt.toString().includes('12:00:00')))
  )
}
private getOptions(city: string) {
  return new HttpParams()
    .set('units', 'metric')
    .set('q', city)
    .set('appId', this.apiKey);
}

}
