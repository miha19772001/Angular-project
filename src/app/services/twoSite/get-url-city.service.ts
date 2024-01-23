import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUrlCityService {

  constructor(private http: HttpClient) { }

  private API_KEY: string = 'c9d1ec4b029dada89104c4eff22b0229';

  public getCityWeatherForSevenDays(): Observable<Object> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=56.328674&lon=44.002048&exclude=delay&appid=${this.API_KEY}&lang=ru`);
  }
}

