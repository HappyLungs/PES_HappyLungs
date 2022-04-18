class LevelCalculator {

    constructor (){
        //Pollutants used to calculate contaminatin level
        this.availablePollutants = ['CO', 'NO2', 'O3', 'PM10', 'PM2.5', 'SO2'];
        
        //Pollutants ranges
        this.co = [0, 2, 4, 8, 30, 100, 1000];
        this.no2 = [0, 25, 50, 100, 200, 400, 1000];
        this.o3 = [0, 33, 65, 120, 180, 240, 1000];
        this.pm10 = [0, 12, 25, 50, 90, 180, 1000];
        this.pm25 = [0, 7, 15, 30, 55, 110, 1000];
        this.so2 = [0, 25, 50, 120, 350, 500, 1000];
        
        //Units of pollutant ranges
        this.units = "ug/m3";

        //Level of each pollutant range
        this.level = ["excellent", "fine", "moderate", "poor", "veryPoor", "severe"];
        this.colors = ["green", "yellow", "orange", "red", "purple", "brown"]
    }

    getAvailablePollutants () {
        return this.availablePollutants;
    }

    getPollutantRange(element) {
        switch(element) {
            case 'CO':
                return this.co
            case 'NO2':
                return this.no2
            case 'O3':
                return this.o3
            case 'PM10':
                return this.pm10
            case 'PM2.5':
                return this.pm25
            case 'SO2':
                return this.so2
        }
    }
    calculatePollutantLevel(element, num) {
        let ranges = this.getPollutantRange(element);
        for (var i=0; i<ranges.length-1; i++) {
            let lo = ranges[i]
            let hi = ranges[i+1]
            if (num >= lo && num < hi) return i
        }
        return -1
    }

    calculateLevelHour (pollutants) {
        if (pollutants.size === 0) return null;
        let maxLevel = 0
        for(const [pollutant, quantity] of pollutants) {
            
            let actLevel = this.calculatePollutantLevel(pollutant, quantity);
            if (actLevel > maxLevel) maxLevel = actLevel
        //    console.log(pollutant+"("+quantity+") -> "+actLevel);
        }
        return maxLevel
    }
}

module.exports = LevelCalculator;