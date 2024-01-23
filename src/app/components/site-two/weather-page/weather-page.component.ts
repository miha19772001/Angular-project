import { Component, OnInit, Renderer2 } from '@angular/core';

import { GetUrlCityService } from 'src/app/services/twoSite/get-url-city.service';

import { IWeather } from 'src/assets/Interfaces/IWeather';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss'],
  providers: [GetUrlCityService],
})
export class WeatherPageComponent implements OnInit {

  constructor(private getUrlCity: GetUrlCityService, private renderer: Renderer2) { }

  public logo: string = 'My Weather';
  public shortLogo: string = 'MW';

  public months: Array<string> = ['янв.', 'фев.', 'мар.', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'];
  public daysOfWeek: Array<string> = ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'];
  public daysOfWeekFullName: Array<string> = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  public weather: IWeather = {
    temp: '',
    feels_like: '',
    description: '',
    pressure: '',
    img: '',
    wind: {
      deg: 0,
      speed: 0,
    },
    date: 0,
    month: '',
    dayOfWeek: '',
    dayOfWeekFullName: '',
  };

  public weatherCards: IWeather[] = [];

  //Track events by clicking on the card
  public showDataOfTheSelectedDay(index: any) {
    this.weather = this.weatherCards[index];
  }


  //Arrow of a direction of the wind
  public getDirectionOfTheWind(speed: number, deg: number) {

    let arrow = document.getElementById('info__mean-arrow');
    let wind = document.getElementById('info__mean-wind');

    if (deg === 0 || deg === 360 || deg <= 22 || deg > 348) {
      this.renderer.setStyle(arrow, "transform", `rotate(${deg.toString()}deg)`);
      wind!.innerHTML = `${speed} м/c С` + "";
    }

    else if (Boolean(deg < 22) || deg <= 67) {
      this.renderer.setStyle(arrow, "transform", `rotate(${deg.toString()}deg)`);
      wind!.innerHTML = `${speed} м/c СВ`;
    }

    else if (Boolean(deg < 67) || deg <= 112) {
      this.renderer.setStyle(arrow, "transform", `rotate(${deg.toString()}deg)`);
      wind!.innerHTML = `${speed} м/c В`;
    }

    else if (Boolean(deg < 112) || deg <= 157) {
      this.renderer.setStyle(arrow, "transform", `rotate(${deg.toString()}deg)`);
      wind!.innerHTML = `${speed} м/c ЮВ`;
    }

    else if (Boolean(deg < 157) || deg <= 202) {
      this.renderer.setStyle(arrow, "transform", `rotate(${deg.toString()}deg)`);
      wind!.innerHTML = `${speed} м/c Ю`;
    }

    else if (Boolean(deg < 202) || deg <= 247) {
      this.renderer.setStyle(arrow, "transform", `rotate(${deg.toString()}deg)`);
      wind!.innerHTML = `${speed} м/c ЮЗ`;
    }

    else if (Boolean(deg < 247) || deg <= 292) {
      this.renderer.setStyle(arrow, "transform", `rotate(${deg.toString()}deg)`);
      wind!.innerHTML = `${speed} м/c З`;
    }

    else if (Boolean(deg < 292) || deg <= 359) {
      this.renderer.setStyle(arrow, "transform", `rotate(${deg.toString()}deg)`);
      wind!.innerHTML = `${speed} м/c СЗ`;
    }
  }

  scrollToTop() {
    window.scrollTo(pageYOffset, 0);
  }

  ngOnInit(): void {

    this.getUrlCity.getCityWeatherForSevenDays()
      .subscribe(
        (data: any) => {

          let tomorrow = new Date();

          //The data for today
          this.weather.temp = (Math.round(data.current.temp - 273)).toString() + '°';

          this.weather.feels_like = (Math.round(data.current.feels_like - 273)).toString() + '°';

          let description = data.current.weather[0].description;
          this.weather.description = description[0].toUpperCase() + description.slice(1);

          this.weather.pressure = (Math.round(data.current.pressure * 0.75)).toString();

          this.weather.img = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;

          this.weather.wind.deg = data.current.wind_deg;

          this.weather.wind.speed = Math.round(data.current.wind_speed);

          this.getDirectionOfTheWind(this.weather.wind.speed, this.weather.wind.deg);

          this.weather.dayOfWeek = 'Сегодня';

          this.weather.dayOfWeekFullName = 'Сегодня';

          this.weather.date = new Date().getDate();

          this.weather.month = this.months[new Date().getMonth()];


          this.weatherCards.push(this.weather)

          // Get data for this week 
          for (let i = 1; i < 7; i++) {
            tomorrow.setDate(tomorrow.getDate() + 1);

            let card = {
              temp: Math.round(data.daily[i].temp.day - 273).toString() + '°',

              feels_like: Math.round(data.daily[i].feels_like.day - 273).toString() + '°',

              description: data.daily[i].weather[0].description.charAt(0).toUpperCase() + data.daily[i].weather[0].description.slice(1),

              pressure: (Math.round(data.daily[i].pressure * 0.75)).toString(),

              img: `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`,

              wind: {
                deg: Math.round(data.daily[i].wind_deg),
                speed: Math.round(data.daily[i].wind_speed),
              },

              date: tomorrow.getDate(),

              month: this.months[tomorrow.getMonth()],

              dayOfWeek: this.daysOfWeek[tomorrow.getDay()],

              dayOfWeekFullName: this.daysOfWeekFullName[tomorrow.getDay()],
            }

            this.weatherCards.push(card);
          }
        }
      )
  }
}
