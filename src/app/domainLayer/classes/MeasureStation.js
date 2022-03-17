export default class MeasureStation {

    constructor (eoiCode, stationName, date, pollutants, stationType, altitude, latitude, length) {
        this.eoiCode = eoiCode;
        this.stationName = stationName;
        this.stationType = stationType;
        this.altitude = altitude;
        this.latitude = latitude;
        this.length = length;
    }

    getMeasuresByHour(date, hour) {
        /*
            SELECT pollutant, quantity
            FROM dadesObertes o
            WHERE o.eoiCode = this.eoiCode, o.date = date

            De lo de antes solo en la hora hour
        */
        //devuelva map[(no2,23), (pn10, 6)]
    }

    getMeasuresByDay(date, hour) {
        /*
            SELECT pollutant, quantity
            FROM dadesObertes o
            WHERE o.eoiCode = this.eoiCode, o.date = date

            De lo de antes solo en la hora hour
        */
       //devuelva map[(1,((no2,23), (pn10, 6))), (2, ... )]
    }
}