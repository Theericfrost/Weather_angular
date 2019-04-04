import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Forecast } from '../forecast';
import { WeatherService } from '../weather.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wa-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor(private weatherService:WeatherService) { }

  forecastForm:FormGroup;
  cityForecast:Forecast[] = [];

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl()
    })
  }

  onSubmit() {
    this.cityForecast.splice(0, this.cityForecast.length);
    this.weatherService.manyDaysForecast(this.forecastForm.value.forecastCity).subscribe(
      (data) => {
        for (let i = 0; i < data["list"].length; i += 8) {
          const temporary = new Forecast(data['list'][i].dt_txt,
            data['list'][i].weather[0].icon,
            data['list'][i].main.temp_max,
            data['list'][i].main.temp_min
          )
          this.cityForecast.push(temporary);
        }
      }
    );
  }

  sortData() {
    this.cityForecast.splice(0, this.cityForecast.length);
    this.weatherService.manyDaysForecast(this.forecastForm.value.forecastCity).subscribe(

      (data) => {

        for (let i = 39; i >= 0; i -= 8) {
          const temporary = new Forecast(data["list"][i].dt_txt,
            data['list'][i].weather[0].icon,
            data['list'][i].main.temp_max,
            data['list'][i].main.temp_min
          )
          this.cityForecast.push(temporary);
        }
      }
    );
  }

  sortTemp() {
    this.cityForecast.splice(0, this.cityForecast.length);
    this.weatherService.manyDaysForecast(this.forecastForm.value.forecastCity).subscribe(
      (data) => {
        for (let i = 0; i < data["list"].length; i += 8) {
          const temporary = new Forecast(data['list'][i].dt_txt,
            data['list'][i].weather[0].icon,
            data['list'][i].main.temp_max,
            data['list'][i].main.temp_min
          )
          this.cityForecast.push(temporary);
        }
        for (let j = 0; j < this.cityForecast.length - 1; j++) {
          for (let m = 0; m < this.cityForecast.length - 1; m++) {
            if (this.cityForecast[m].tempMax > this.cityForecast[m + 1].tempMax) {
              [this.cityForecast[m], this.cityForecast[m + 1]] = [this.cityForecast[m + 1], this.cityForecast[m]];
            }
          }
        }

      }
    );
  }

  sortTempReverse() {
    this.cityForecast.splice(0, this.cityForecast.length);
    this.weatherService.manyDaysForecast(this.forecastForm.value.forecastCity).subscribe(
      (data) => {
        for (let i = 0; i < data["list"].length; i += 8) {
          const temporary = new Forecast(data['list'][i].dt_txt,
            data['list'][i].weather[0].icon,
            data['list'][i].main.temp_max,
            data['list'][i].main.temp_min
          )
          this.cityForecast.push(temporary);
        }
        for (let j = 0; j < this.cityForecast.length - 1; j++) {
          for (let m = 0; m < this.cityForecast.length - 1; m++) {
            if (this.cityForecast[m].tempMax < this.cityForecast[m + 1].tempMax) {
              [this.cityForecast[m], this.cityForecast[m + 1]] = [this.cityForecast[m + 1], this.cityForecast[m]];
            }
          }
        }

      }
    );
  }
}
