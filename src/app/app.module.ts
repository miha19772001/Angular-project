import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

//To site one
import { SiteOneModule } from './components/site-one/site-one/site-one.module';

//To site two
import { WeatherPageModule } from './components/site-two/weather-page/weather-page.module';

//To site three
import { GamePageModule } from './components/site-three/game-page/game-page.module';

//To site home
import { HomeModule } from './components/home/home.module';

//To site header
//import { HeaderModule } from './components/header/header.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
  ],
  exports: [
    //HeaderModule,
    HomeModule,
    SiteOneModule,
    WeatherPageModule,
    GamePageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }