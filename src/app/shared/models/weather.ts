export class Weather {
    conditions: string;
    temp: string;
    tempMin: string;
    tempMax: string;
    locationName: string;

    tempForecast: string;
    tempMinForecast: string;
    tempMaxForecast: string;
    locationNameForecast: string;
    date: string;

    get name(): string {
        return(this.locationName);
    }

    static fromCurrentJS(json: any) {
        if (json == null) {
            return(null);
        }
        let conditions = 'n/a';
        if ((json.weather || []).length >= 1) {
            conditions = json.weather[0].main;
        }

        return(Object.assign(Object.create(Weather.prototype), {
            conditions,
            temp: (json.main || {}).temp,
            tempMin: (json.main || {}).temp_min,
            tempMax: (json.main || {}).temp_max,
            locationName: json.name
        }));
    }

    static fromForecastJS(json: any) {
        if (json == null) {
            return(null);
        }
        let conditions = 'n/a';
        if ((json.weather || []).length >= 1) {
            conditions = json.weather[0].main;
        }

        return(Object.assign(Object.create(Weather.prototype), {
            conditions,
            tempForecast: (json.main || {}).temp,
            tempMinForecast: (json.main || {}).temp_min,
            tempMaxForecast: (json.main || {}).temp_max,
            locationNameForecast: json.name,
            date: json.dt_txt
        }));
    }
}
