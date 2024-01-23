import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//SiteOne
import { SiteOneComponent } from './components/site-one/site-one/site-one.component';

//SiteTwo
import { WeatherPageComponent } from './components/site-two/weather-page/weather-page.component';

//SiteThree
import { GamePageComponent } from './components/site-three/game-page/game-page.component';

//Home
import { HomeComponent } from './components/home/home-page/home.component';

const routes: Routes = [

  //Link to home site
  { path: 'home', component: HomeComponent },

  //Links to the first site
  { path: 'siteOne', component: SiteOneComponent },

  //Link to the second site
  { path: 'siteTwo', component: WeatherPageComponent },

  //Link to the third site
  { path: 'siteThree', component: GamePageComponent },

  //Link to home
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
