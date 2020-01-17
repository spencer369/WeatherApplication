export class Weather {
    zipcode: string;
    conditions: string;
    temp: string;
    tempMin: string;
    tempMax: string;
    locationName: string;
    windSpeed: string;
    precipitationSnow: number;
    precipitationRain: number;

    tempForecast: string;
    tempMinForecast: string;
    tempMaxForecast: string;
    locationNameForecast: string;
    date: string;
    conditionsForecast: string;
    precipitationForecast: string;
    windSpeedForecast: number;

    get name(): string {
        return(this.locationName);
    }

    static fromCurrentJS(json: any) {
        if (json == null) {
            return(null);
        }
        let conditions = 'n/a';
        let precipitationSnow = 0;
        let precipitationRain = 0;
        if ((json.weather || []).length >= 1) {
            conditions = json.weather[0].main;
        }
        if ((json.rain)) {
            precipitationRain = json.rain['1h'] || json.rain['3h'];
        }
        if ((json.snow)) {
            precipitationSnow = json.snow['1h'] || json.snow['3h'];
        }

        return(Object.assign(Object.create(Weather.prototype), {
            conditions,
            temp: (json.main || {}).temp,
            tempMin: (json.main || {}).temp_min,
            tempMax: (json.main || {}).temp_max,
            locationName: json.name,
            windSpeed: json.wind.speed,
            precipitationSnow,
            precipitationRain,
        }));
    }

    static fromForecastJS(json: any) {
        if (json == null) {
            return(null);
        }
        let conditionsForecast = 'n/a';
        let precipitationSnow = 0;
        let precipitationRain = 0;
        if ((json.weather || []).length >= 1) {
            conditionsForecast = json.weather[0].main;
        }
        if ((json.rain)) {
            console.log(json.rain['1h']);
            precipitationRain = json.rain['1h'] || json.rain['3h'];
        }
        if ((json.snow)) {
            console.log(json.snow['1h']);
            precipitationSnow = json.snow['1h'] || json.snow['3h'];
        }
        return(Object.assign(Object.create(Weather.prototype), {
            conditionsForecast,
            tempForecast: (json.main || {}).temp,
            tempMinForecast: (json.main || {}).temp_min,
            tempMaxForecast: (json.main || {}).temp_max,
            date: json.dt_txt,
            windSpeedForeCast: json.wind.speed,
            precipitationRain,
            precipitationSnow
        }));
    }
}
