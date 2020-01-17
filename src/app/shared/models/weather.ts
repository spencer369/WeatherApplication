export class Weather {
    zipcode: string;
    conditions: string;
    temp: string;
    tempMin: string;
    tempMax: string;
    locationName: string;
    windSpeed: string;
    precipitation: string;

    tempForecast: string;
    tempMinForecast: string;
    tempMaxForecast: string;
    locationNameForecast: string;
    date: string;
    conditionsForecast: string;
    precipitationForecast: string;
    windSpeedForecast: string;

    get name(): string {
        return(this.locationName);
    }

    static fromCurrentJS(json: any) {
        if (json == null) {
            return(null);
        }
        let conditions = 'n/a';
        let precipitation = 'n/a';
        if ((json.weather || []).length >= 1) {
            conditions = json.weather[0].main;
        }
        if ((json.rain || []).length >= 1) {
            precipitation = json.rain['1h'] || json.rain['3h'];
        }
        if ((json.snow || []).length >= 1) {
            precipitation = json.snow['1h'] || json.snow['3h'];
        }

        return(Object.assign(Object.create(Weather.prototype), {
            conditions,
            temp: (json.main || {}).temp,
            tempMin: (json.main || {}).temp_min,
            tempMax: (json.main || {}).temp_max,
            locationName: json.name,
            windSpeed: json.wind.speed,
            precipitation,
        }));
    }

    static fromForecastJS(json: any) {
        if (json == null) {
            return(null);
        }
        let conditionsForecast = 'n/a';
        if ((json.weather || []).length >= 1) {
            conditionsForecast = json.weather[0].main;
        }
        console.log(json);
        return(Object.assign(Object.create(Weather.prototype), {
            conditionsForecast,
            tempForecast: (json.main || {}).temp,
            tempMinForecast: (json.main || {}).temp_min,
            tempMaxForecast: (json.main || {}).temp_max,
            date: json.dt_txt,
            windSpeedForeCast: json.wind.speed
        }));
    }
}
