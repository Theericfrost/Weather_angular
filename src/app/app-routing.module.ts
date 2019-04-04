import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentComponent } from "./current/current.component";
import { ForecastComponent } from "./forecast/forecast.component";
import { ResolveLocationService } from "./resolve-location.service";

const routes: Routes = [
  { path: '', component: CurrentComponent, resolve: { myWeather: ResolveLocationService } },
  { path: 'forecast', component: ForecastComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
