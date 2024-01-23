export interface IWeather {
	temp: string;
	feels_like: string;
	description: string;
	pressure: string;
	img: string;
	wind: {
		deg: number,
		speed: number,
	}
	date: number,
	month: string,
	dayOfWeek: string,
	dayOfWeekFullName: string,
}