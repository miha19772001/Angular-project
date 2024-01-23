import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../../header/header.module';
import { GamePageComponent } from './game-page.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    HeaderModule,
  ],
  declarations: [
    GamePageComponent,
  ],
  exports: [GamePageComponent],
  providers: [],
})
export class GamePageModule { }
