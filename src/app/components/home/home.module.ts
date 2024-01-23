import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home-page/home.component';
import { HomeHeaderComponent } from './home-header/home-header.component';


@NgModule({
  declarations: [HomeComponent, HomeHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [HomeComponent],
  providers: [],
})
export class HomeModule { }
