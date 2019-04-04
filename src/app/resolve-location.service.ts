import { Injectable } from '@angular/core';
import { WeatherService } from './weather.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResolveLocationService implements Resolve<any>{

  constructor(private ws: WeatherService) { }

  resolve() {
    return this.ws.localWeather("59.9342802","30.3350986");
  }
}
