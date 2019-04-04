import { Injectable } from '@angular/core';
import { CurrentWeater } from './current-weater';
import { HttpClient } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Forecast } from './forecast';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  myWeather: CurrentWeater;
  location
  constructor(private http: HttpClient) { }

  localWeather(lat: string, lon: string) {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6b0667211a8cffabb26eeb02d8ef578a&units=metric`).pipe(
          map(res => res)
        ).toPromise().then(
          (data) => {
            this.myWeather = new CurrentWeater(data['name'],
              data['main'].temp,
              data[`weather`][0].icon,
              data[`weather`][0].description,
              data['main'].temp_max,
              data['main'].temp_min);
            res(this.myWeather);
          }
        )
      })
    })
  }

  anotherCityWeather(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6b0667211a8cffabb26eeb02d8ef578a&units=metric`)
      .pipe(
        map(res => res),
        catchError((err: Response) => {
          alert("Город не найден");
          return Observable.throw(err.statusText);
        })
      )
  }

  manyDaysForecast(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=6b0667211a8cffabb26eeb02d8ef578a&units=metric`)
      .pipe(
        map(res => res),
        catchError((err: Response) => {
          alert("Город не найден");
          return Observable.throw(err.statusText);
        }
        )
      )
  }
}
