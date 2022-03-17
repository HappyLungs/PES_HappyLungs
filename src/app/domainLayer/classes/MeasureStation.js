import { getMeasuresDay } from "./ConsultesMesures.js";
import { LevelCalculator } from "../services/LevelCalculator.js"

class MeasureStation {

    constructor (eoiCode, stationName, stationType, altitude, latitude, length) {
        this.eoiCode = eoiCode;
        this.stationName = stationName;
        this.stationType = stationType;
        this.altitude = altitude;
        this.latitude = latitude;
        this.length = length;
        this.levelCalculator = new LevelCalculator();
    }

    /*
        Returns the contamination level on this MeasureStation at the hour "hour" on the day date
    */
    async getHourLevel(date, hour) {
        //Some stuff - Revisar Alex
        let data = new Map();
        let hora = null;
        if(hour >= 10) hora = 'h'+hour;
        else hora = 'h0'+hour;
        
        //Database query to get the measures taken in this MeasureStation on the day date
        let measures = await getMeasuresDay(this.eoiCode, date);

        //Pollutants used to calculate the contamination level with the LevelCalculator
        let availablePollutants = ['CO', 'NO2', 'O3', 'PM10', 'PM2.5', 'SO2'];
        
        //Gets the pollutant of each measure and its quantity in the hour "hour" and saves it into "data"
        measures.forEach(pollutantData => {
            
            let pollutant = pollutantData.contaminant;

            if (availablePollutants.includes(pollutant) ){

                if(typeof pollutantData[hora] === 'undefined'){
                    hora = hora.toString().slice(-2);
                    for(let i = parseInt(hora); i >= 1; --i){
                        if(hora >= 10)  hora = 'h'+ i;
                        else      hora= 'h0'+i;
                        if(typeof pollutantData[hora] !== 'undefined') {
                            data.set(pollutantData.contaminant, pollutantData[hora])
                            break;
                        }
                    }
                    hora = hour;
                } else {
                    data.set(pollutantData.contaminant, pollutantData[hora])
                }

            }
        })


        //Calculates the contamination level
        let level = this.levelCalculator.calculateLevelHour(data)
        
        return level;
    }

    /*
        Returns the contamination level on this MeasureStation at the hour "hour" of the day date
    */
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

export {MeasureStation};
