const TouchHistoryMath = require("react-native/Libraries/Interaction/TouchHistoryMath");
const DadesObertes = require("../services/DadesObertes");
const LevelCalculator = require("../services/LevelCalculator");


const dadesObertes = new DadesObertes();
const levelCalculator = new LevelCalculator();

class MeasureStation {
    static Stations;
    level;

    constructor (eoiCode, stationName, stationType, latitud, longitud, length) {
        if(MeasureStation.Stations===undefined)MeasureStation.Stations=[];
        this.eoiCode = eoiCode;
        this.stationName = stationName;
        this.stationType = stationType;
        this.latitud = latitud;
        this.longitud = longitud;
        this.length = length;
        this.months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        if(stationType ==="heatmap"){
            if(MeasureStation.Stations.length!==0 && MeasureStation.Stations.find(element => element.eoi === eoiCode)===undefined){
                MeasureStation.Stations.push({
                    eoi: eoiCode,
                    station: this,
                });
            }else if(MeasureStation.Stations.length===0 ){
                MeasureStation.Stations.push({
                    eoi: eoiCode,
                    station: this,
                });
            }
        }
    }


    /**
     * Convert an hour into DadesObertes API hour format
     * @param {Integer} hour hour from 1 to 24
     * @returns  hour with an h, and if hour < 10 also with a 0 (example: hour = 5 -> "h05" | hour = 10 -> "h10")
     */
    hour2JsonHour(hour) {
        if (hour < 10) return "h0"+hour;
        else return "h"+hour;
    }

    //CALCULATORS USED FOR LEVEL GETTERS
    station_name(){
        return this.stationName
    }
    /**
     * Given a measure from Dades Obertes API and an hour, returns the pollution level at this hour
     * @param {JSON} measure measure of one pollutant at one date
     * @param {String} hour hour from 1 to 24
     * @returns pollution level of measure "measure" at hour "hour"
     */
    calcHourQuantity(measure, hour) {
        if(typeof measure[hour] === 'undefined'){
            let ahour = hour.toString().slice(-2);
            for(let i = parseInt(ahour); i >= 1; --i){
                if(ahour >= 10)  ahour = 'h'+ i;
                else ahour= 'h0'+i;
                if(typeof measure[ahour] !== 'undefined') {
                    return measure[ahour];

                }
            }
        } else {
            return measure[hour];
        }
    }

    /**
     * Given the Dades Obertes measures of a day in one measure station and an hour, calculates the
     * pollution level at this hour in this measure station
     * @param {JSON} measures measures of all pollutants at one day
     * @param {Integer} hour hour from 1 to 24
     * @returns {Integer} pollution level at hour "hour" 
     */
    calcHourLevel(measures, hour) {
        if(this.level == null){
            let calculatorData = new Map();
            let availablePollutants = levelCalculator.getAvailablePollutants();

            measures.forEach( measure => {
                let pollutant = measure.contaminant;
                if (availablePollutants.includes(pollutant)) {
                    let quantity = this.calcHourQuantity(measure, this.hour2JsonHour(hour));
                    calculatorData.set(pollutant,quantity);
                }

            });
            this.level=levelCalculator.calculateLevelHour(calculatorData)
        }
        return this.level;
    }

    /**
     * Given the Dades Obertes measures of a day in one measure station, calculates the
     * pollution level at this day in this measure station
     * @param {JSON} measures measures of all pollutants at one day
     * @returns {Array<Integer>} all levels of every hour of measures
     */
    calcDayLevel(measures) {
        let hourlyLevel = [];

        for(let i = 1; i <= 24; i++) {
            let level = this.calcHourLevel(measures, i);
            hourlyLevel.push(level);
        }

        return hourlyLevel;
    }

    /**
     * Given the Dades Obertes measures of a day in one measure station and an hour, calculates the
     * pollution level at this hour in this measure station
     * @param {JSON} measures measures of all pollutants at different days
     * @returns {Array<Integer>} all levels of every day in measures
     */
    calcMultipleDaysLevel(measures) {
        let dayMeasures = new Map();

        measures.forEach( m => {
            let day = new Date(m.data).getDate();
            if (!dayMeasures.has(day)) dayMeasures.set(day, [m])
            else dayMeasures.set(day, [...dayMeasures.get(day), m]);
        })

        let dailyLevel = []
        dayMeasures.forEach( m => {
            let hourlyLevel = this.calcDayLevel(m);
            let dayAverage = Math.round(hourlyLevel.reduce((x,y) => x + y, 0) / hourlyLevel.length);
            //let dayAverage = Math.max(hourlyLevel);
            dailyLevel.push(dayAverage);
        })

        return dailyLevel;
    }

    //POLLUTION LEVEL GETTERS

    /**
     * Calculates the pollution level at one hour of a day
     * @param {Date} date date
     * @param {Integer} hour hour
     * @returns {Integer} pollution level at the date "date" and hour "hour"
     */
    async getHourLevel(date, hour) {
        if(this.level===undefined){
            let measures = await dadesObertes.getMeasuresDay(this.eoiCode, date);
            this.level=this.calcHourLevel(measures, hour);
            if(this.level===0 || this.level==null)this.level=1;
        }
        return this.level;
    }

    /**
     * Calculates the pollution level at every hour of the day
     * @param {Date} date date
     * @returns {Array<Integer>} pollution level at every hour of a day
     */ 
    async getDayLevel(date) {
        let hour = date.getHours();
        let last24hours = new Date(date.getTime() - (24 * 60 * 60 * 1000));
        
        let title;
        let tags = [];
        let hourlyLevel = []; 
        if (date.getDate() === last24hours.getDate()) {
            title = date.getDate()+" - "+TouchHistoryMath.months[date.getMonth()]
            let measures = await dadesObertes.getMeasuresDay(this.eoiCode, date);
            hourlyLevel = this.calcDayLevel(measures);
        } else {
            title = last24hours.getDate()+"/"+date.getDate()+" - "+this.months[date.getMonth()]
            let measuresYesterday = await dadesObertes.getMeasuresDay(this.eoiCode, last24hours);
            let hourlyLevelYestarday = this.calcDayLevel(measuresYesterday);
            let measuresToday = await dadesObertes.getMeasuresDay(this.eoiCode, date);
            let hourlyLevelToday = this.calcDayLevel(measuresToday);

            for (let i = hour-1; i < 24; i++) {
                hourlyLevel.push(hourlyLevelYestarday[i]);
                tags.push(i+1);
            }
            for (let i = 0; i < hour -1; i ++) {
                hourlyLevel.push(hourlyLevelToday[i]);
                tags.push(i+1);
            }
        }

        return {
            title: title,
            tags: tags,
            levels: hourlyLevel
        };
    }

    /**
     * Calculates the pollution level at every day of a week
     * @param {Date} date date
     * @returns {Array<Integer>} pollution level of the latest 7 days from date
     */ 
    async getWeekLevel(date) {
        let lastweek = new Date(date)
        lastweek.setDate(lastweek.getDate() - 6)
        let measures = await dadesObertes.getMeasuresMultipleDays(this.eoiCode, lastweek, date);
        let dailyLevel = this.calcMultipleDaysLevel(measures);

        let tags = [];
        for(let i = 0; i < 7; ++i) {
            let dayNum = new Date(lastweek)
            dayNum.setDate(dayNum.getDate()+i);
            let day = dayNum.getDate();
            tags.push(day);
        }

        let title;
        if (date.getMonth() === lastweek.getMonth()) title = this.months[date.getMonth()];
        else title = this.months[date.getMonth()]+" - "+this.months[lastweek.getMonth()];

        return {
            title: title,
            tags: tags,
            levels: dailyLevel
        };
    }

    /**
     * Calculates the pollution level at every day of a month
     * @param {Date} date date
     * @returns {Array<Integer>} pollution level of the latest 30 days from date
     */ 
     async getMonthLevel(date) {
        let lastmonth = new Date(date)
        lastmonth.setDate(lastmonth.getDate() - 29)
        let measures = await dadesObertes.getMeasuresMultipleDays(this.eoiCode, lastmonth, date);
        let dailyLevel = this.calcMultipleDaysLevel(measures);

        let tags = [];
        for(let i = 0; i < 30; ++i) {
            let dayNum = new Date(lastmonth)
            dayNum.setDate(dayNum.getDate()+i);
            let day = dayNum.getDate();
            tags.push(day);
        }

        let title;
        if (date.getMonth() === lastmonth.getMonth()) title = this.months[date.getMonth()];
        else title = this.months[lastmonth.getMonth()]+" - "+this.months[date.getMonth()];

        return {
            title: title,
            tags: tags,
            levels: dailyLevel
        };
    }

    /**
     * Calculates the pollution level at every month of last year
     * @param {Date} date date
     * @returns {Array<Integer>} pollution level of the latest 30 days from date
     */
    async getYearLevel(date) {
        let lastYear = new Date(date);
        lastYear.setMonth(lastYear.getMonth() - 10);
        lastYear.setDate(0);
        let measures = await dadesObertes.getMeasuresMultipleDays(this.eoiCode, lastYear, date);


        let measuresByMonth = new Map();
        measures.forEach(measure => {
            let measureDate = new Date(measure.data);
            let auxMonth = (parseInt(measureDate.getMonth())<9 ? "0"+(parseInt(measureDate.getMonth())+1).toString() : (parseInt(measureDate.getMonth())+1).toString());
            let month = measureDate.getFullYear().toString()+auxMonth;
            if (! measuresByMonth.has(month)) measuresByMonth.set(month, [measure]);
            else {
                measuresByMonth.get(month).push(measure);
                //measuresByMonth.set(month, m);
            }
        })
        let measuresByMonthOrdered = new Map([...measuresByMonth.entries()].sort());

        let tags = [];
        let monthlyLevel = [];
        for(let [month, measures] of measuresByMonthOrdered) {
            tags.push(month.slice(-2));
            let dailyLevel = this.calcMultipleDaysLevel(measures);
            let monthLevel = Math.round(dailyLevel.reduce((a, b) => a + b, 0) / dailyLevel.length);
            monthlyLevel.push(monthLevel);
        }

        let title;
        if (date.getFullYear() === lastYear.getFullYear()) title = date.getFullYear();
        else title = lastYear.getFullYear()+" / "+date.getFullYear();

        return {
            title: title,
            tags: tags,
            levels: monthlyLevel
        };
    }


    //POLLUTANTS QUANTITTY CALCULATOR

    /**
     * Calculates the quantity of the pollutant (pollutantData) at an hour. If there's
        no data of it takes the last detected data on that point.
     * @param {*} pollutantData 
     * @param {*} hour 
     * @returns Returns the quantity of the pollutant (pollutantData) at an hour
     */
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
        } else {
            return pollutantData[hour];
        }
    }

    /**
     * Calculates the total quantity of a specific pollutant on a date.
     * @param {Integer} pollutantData
     * @param {Date} date
     * @returns {Integer} Returns the total quantity of a specific pollutant on a date
     */
    getQuantityOfAPollutantAtDay(pollutantData) {
        let total = 0;
        let jsonHour = null;
        for (let i = 1; i < 25; ++i) {
            if (i >= 10) {
                jsonHour = 'h'+i;
                
            } else {
                jsonHour = 'h0'+i;
            }
            total += parseInt(this.getPollutantQuantityByHour(pollutantData, jsonHour));
        }
        return total;
    }

    async getValuesToArray(measures) {
        let detectedPollutants = [];
        measures.forEach(pollutantData => {
            let pollutant = pollutantData.contaminant;
            let quant = this.getQuantityOfAPollutantAtDay(pollutantData);   //get the pollutant quantity of the day (total/24 or just total)
            if (!isNaN(quant)) {
                var i=0, trobat=false;
                while (i < detectedPollutants.length && !trobat) {
                    if (detectedPollutants[i].name === pollutant) {
                        trobat = true;
                        detectedPollutants[i].quantity += quant;
                        detectedPollutants[i].appear += 1;
                    }
                    i++;
                }
                if (!trobat) detectedPollutants.push({name: pollutant, quantity: quant, appear: 1});
            }
        });
        for (var i=0; i < detectedPollutants.length; i++) {
            detectedPollutants[i].quantity /= detectedPollutants[i].appear;
            detectedPollutants[i].quantity = detectedPollutants[i].quantity.toFixed(2);
        }
        return detectedPollutants;
    }

    /**
     * Calculates the quantities of each pollutant on a date.
     * @param {*} date
     * @returns Returns the quantities of each pollutant on a date-
     */
    async getQuantityOfEachPollutantAtDay(date) {
        //Database query to get the measures taken in this MeasureStation on the day date
        let measuresOfTheDay = await dadesObertes.getMeasuresDay(this.eoiCode, date);
        //Pollutants used to calculate the contamination level with the LevelCalculator
        let detectedPollutants = [];
        detectedPollutants = await this.getValuesToArray(measuresOfTheDay);
        return detectedPollutants.sort((p1, p2) => {return p2.quantity - p1.quantity;}); //sort it descending
    }

    async getQuantityOfEachPollutantAtWeek(date) {
        let lastweek = new Date(date);
        lastweek.setDate(lastweek.getDate() - 6);
        //Database query to get the measures taken in this MeasureStation on the days
        let measuresOfTheWeek = await dadesObertes.getMeasuresMultipleDays(this.eoiCode, lastweek, date);
        //Pollutants used to calculate the contamination level with the LevelCalculator
        let detectedPollutants = [];
        detectedPollutants = await this.getValuesToArray(measuresOfTheWeek);
        return detectedPollutants.sort((p1, p2) => {return p2.quantity - p1.quantity;}); //sort it descending
    }

    async getQuantityOfEachPollutantAtMonth(date) {
        let lastmonth = new Date(date);
        lastmonth.setDate(lastmonth.getDate() - 30);
        //Database query to get the measures taken in this MeasureStation on the days
        let measuresOfTheMonth = await dadesObertes.getMeasuresMultipleDays(this.eoiCode, lastmonth, date);
        //Pollutants used to calculate the contamination level with the LevelCalculator
        let detectedPollutants = [];
        detectedPollutants = await this.getValuesToArray(measuresOfTheMonth);
        return detectedPollutants.sort((p1, p2) => {return p2.quantity - p1.quantity;}); //sort it descending
    }

    async getQuantityOfEachPollutantAtYear(date) {
        let lastyear = new Date(date);
        lastyear.setDate(lastyear.getDate() - 365);
        console.log(lastyear)
        //Database query to get the measures taken in this MeasureStation on the days
        let measuresOfTheYear = await dadesObertes.getMeasuresMultipleDays(this.eoiCode, lastyear, date);
        //Pollutants used to calculate the contamination level with the LevelCalculator
        let detectedPollutants = [];
        detectedPollutants = await this.getValuesToArray(measuresOfTheYear);
        return detectedPollutants.sort((p1, p2) => {return p2.quantity - p1.quantity;}); //sort it descending
    }

    //OTHERS
    
    distance(lat2, lon2) {
       
        let lat1 = this.latitud;
        const lon1 = this.longitud;
        const R = 6371000; // km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        lat1 = this.deg2rad(lat1);
        lat2 = this.deg2rad(lat2);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    //Conversor
    toRad(Value) {
        return (Value * Math.PI / 180);
    }

    deg2rad(deg) {
       let x = deg * (Math.PI/180)
        return deg * (Math.PI/180)
    }

    /*--------------------BORRAR A PARTIT D'AQUI------------------*/

    
    /*
        Returns the contamination level on this MeasureStation at the hour "hour" on the day date
    */
    async getHourLevelversion2(date, hour) {//he cambiado el nombre ya que esta funcion ya existia mas arriba @author arnausempau
        //Some stuff - Revisar Alex
        let data = new Map();
        let jsonHour = null;
        if(hour >= 10) jsonHour = 'h'+hour;
        else jsonHour = 'h0'+hour;
        
        //Database query to get the measures taken in this MeasureStation on the day date
        let measures = await dadesObertes.getMeasuresDay(this.eoiCode, date);

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
        return levelCalculator.calculateLevelHour(data);
    }

    

    /*
        Returns the contamination level on this MeasureStation at the hour "hour" of the day date
    */
    async getMeasuresByDay(date) {
        
        //Database query to get the measures taken in this MeasureStation on the day date
        let measures = await dadesObertes.getMeasuresDay(this.eoiCode, date);
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
            let level = levelCalculator.calculateLevelHour(pollutantQuantity);

            hourlyLevel.set(h, level)
        }

        return hourlyLevel;

    }
    

}

module.exports = MeasureStation;