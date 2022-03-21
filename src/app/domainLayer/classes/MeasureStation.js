import { getMeasuresDay } from "./ConsultesMesures.js";
import { LevelCalculator } from "../services/LevelCalculator.js"

class MeasureStation {

    constructor (eoiCode, stationName, stationType, latitud, longitud, length) {
        this.eoiCode = eoiCode;
        this.stationName = stationName;
        this.stationType = stationType;
        this.latitud = latitud;
        this.longitud = longitud;
        this.length = length;
        this.levelCalculator = new LevelCalculator();
    }


    getPollutantQuantityByHour(pollutantData, hour) {
        if(typeof pollutantData[hour] === 'undefined'){
            hour = hour.toString().slice(-2);
            for(let i = parseInt(hour); i >= 1; --i){
                if(hour >= 10)  hour = 'h'+ i;
                else hour= 'h0'+i;
                if(typeof pollutantData[hour] !== 'undefined') {
                    return pollutantData[hour];

                }
            }
            hour = hour;
        } else {
            return pollutantData[hour];
        }
    }


    /*
        Returns the contamination level on this MeasureStation at the hour "hour" on the day date
    */
    async getHourLevel(date, hour) {
        //Some stuff - Revisar Alex
        let data = new Map();
        let jsonHour = null;
        if(hour >= 10) jsonHour = 'h'+hour;
        else jsonHour = 'h0'+hour;
        
        //Database query to get the measures taken in this MeasureStation on the day date
        let measures = await getMeasuresDay(this.eoiCode, date);

        //Pollutants used to calculate the contamination level with the LevelCalculator
        let availablePollutants = ['CO', 'NO2', 'O3', 'PM10', 'PM2.5', 'SO2'];


        //Gets the pollutant of each measure and its quantity in the hour "hour" and saves it into "data"
        measures.forEach(pollutantData => {
            
            let pollutant = pollutantData.contaminant;

            if (availablePollutants.includes(pollutant) ){
                let pollutant = pollutantData.contaminant;
                let quantity = this.getPollutantQuantityByHour(pollutantData, jsonHour)
                
                data.set(pollutant, quantity)
            }
        })


        //Calculates the contamination level
        let level = this.levelCalculator.calculateLevelHour(data)
        
        return level;
    }

    /*
        Returns the contamination level on this MeasureStation at the hour "hour" of the day date
    */
    async getMeasuresByDay(date) {
        
        //Database query to get the measures taken in this MeasureStation on the day date
        let measures = await getMeasuresDay(this.eoiCode, date);

        let availablePollutants = ['CO', 'NO2', 'O3', 'PM10', 'PM2.5', 'SO2'];
        
        let hourlyLevel = new Map();

        for (let h = 1; h <= 24; ++h) {

            let jsonHour
            if(h >= 10) jsonHour = 'h'+h;
            else jsonHour = 'h0'+h;

            let pollutantQuantity = new Map();

            measures.forEach(pollutantData => {
            
                let pollutant = pollutantData.contaminant;
    
                if (availablePollutants.includes(pollutant) ){
                    let quantity = this.getPollutantQuantityByHour(pollutantData, jsonHour);
                    pollutantQuantity.set(pollutant, quantity);
                }
            })

            //Calculates the contamination level for h hour
            console.log("HORA "+h);
            let level = this.levelCalculator.calculateLevelHour(pollutantQuantity);
            console.log("");

            hourlyLevel.set(h, level)
        }

        return hourlyLevel;

        /*
            measures.forEach(pollutantData => {
                
                let pollutant = pollutantData.contaminant;

                if (availablePollutants.includes(pollutant) ){
                    let totalHours = 0;
                    let quantitySum = 0;
                    for (let h = 1; h <= 24; ++h) {
                        if(hour >= 10) jsonHour = 'h'+hour;
                        else jsonHour = 'h0'+hour;

                        let quantity = pollutantData[h]

                        if (! quantity === 'undefined') {
                            quantitySum += quantity;
                            totalHours += 1; 
                        }
                    }
                }

            }
        */

    }

    distance(lat2,lon2) {

        var lat1 = this.latitud;
        var lon1 = this.longitud;
        //console.log(lat1, lon1)

        var R = 6371; // km
        var dLat = this.toRad(lat2-lat1);
        var dLon = this.toRad(lon2-lon1);
        var lat1 = this.toRad(lat1);
        var lat2 = this.toRad(lat2);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }
    
    //Conversor
    toRad(Value) {
        return Value * Math.PI / 180;
    }

    deg2rad(deg) {
        return deg * (Math.PI/180)
    }



}

export {MeasureStation};