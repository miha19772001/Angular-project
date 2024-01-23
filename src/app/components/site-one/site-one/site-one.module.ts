import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'

import { HeaderModule } from '../../header/header.module';
import { SiteOneComponent } from '../site-one/site-one.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
  ],
  declarations: [
    SiteOneComponent,
  ],
  exports: [SiteOneComponent],
  providers: [],
})
export class SiteOneModule { }
