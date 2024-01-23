import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { WeatherPageComponent } from './weather-page.component';
import { HeaderModule } from '../../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HeaderModule,
  ],
  declarations: [
    WeatherPageComponent,
  ],
  exports: [WeatherPageComponent],
  providers: [],
})
export class WeatherPageModule { }
