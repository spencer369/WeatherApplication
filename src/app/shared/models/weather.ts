export class Weather {
    temp: string;
    tempMin: string;
    tempMax: string;
    locationName: string;

    get name(): string {
        return(this.locationName);
    }

    static fromJS(json: any) {
        if (json == null) {
            return(null);
        }

        return(Object.assign(Object.create(Weather.prototype), {
            temp: json.main.temp,
            tempMin: json.main.temp_min,
            tempMax: json.main.temp_max,
            locationName: json.name
        }));
        return(null);
    }
}
