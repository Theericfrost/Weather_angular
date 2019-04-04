import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentComponent } from './current/current.component';
import { ForecastComponent } from './forecast/forecast.component';
import { LogoComponent } from './logo/logo.component';
import { WeatherService } from './weather.service';
import { ResolveLocationService } from './resolve-location.service';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CurrentComponent,
    ForecastComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WeatherService, HttpClientModule, ResolveLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
