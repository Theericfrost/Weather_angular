import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CurrentWeater } from '../current-weater';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'
@Component({
  selector: 'wa-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  myWeather: CurrentWeater;
  constructor(private ws: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { myWeather: CurrentWeater }) => {
        this.myWeather = data.myWeather;
      }
    )
  }
  onSubmit(weatherForm: NgForm) {
    this.ws.anotherCityWeather(weatherForm.value.city).subscribe(
      (data) => {

        this.myWeather = new CurrentWeater(data["name"],
          data["main"].temp,
          data['weather'][0].icon,
          data['weather'][0].description,
          data["main"].temp_max,
          data["main"].temp_min);
      })
  }
}
