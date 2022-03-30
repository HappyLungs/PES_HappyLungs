const DadesObertes = require("../services/DadesObertes");
const MeasureStation = require("./MeasureStation.js");

const dadesObertes = new DadesObertes();

class DataPointMap {

    constructor (latitude, longitud) {
       this.latitude = latitude;
       this.longitud = longitud;
    }

    //Me pasan un punto un cualquier, buscar entre los mas cercanos y que devuelva 1. Ver la contaminación de ese punto

    //LINEAR CHART GETTERS
    async  getHourLevel(date, hour) {
        let nearPoints = await this.nearerPoints();

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
        let x = await nearPoint.getHourLevel(date, hour);
        return x;    
    }

    async getDayLevel (date) {
        let nearPoints = await this.nearerPoints(date);

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
        let x = await nearPoint.getDayLevel(date);
        return x;     
    }

    async getWeekLevel (date) {
        let nearPoints = await this.nearerPoints(date);

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
        let x = await nearPoint.getWeekLevel(date);
        return x;  
    }

    async getMonthLevel (date) {
        let nearPoints = await this.nearerPoints(date);

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
        let x = await nearPoint.getMonthLevel(date);
        return x;
    }
    
    //PIE CHART GETTERS
    async getPollutantsQuantDay (date) {
        let nearPoints = await this.nearerPoints(date);

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
        let x = await nearPoint.getQuantityOfEachPollutantDay(date);
        return x;     
    }

    async getPollutantsQuantWeek (date) {
        let nearPoints = await this.nearerPoints(date);

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
        let x = await nearPoint.getQuantityOfEachPollutantWeek(date);
        return x;     
    }

    async getPollutantsQuantMonth (date) {
        let nearPoints = await this.nearerPoints(date);

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
        let x = await nearPoint.getQuantityOfEachPollutantMonth(date);
        return x;     
    }
    
    async getPollutantsQuantYear (date) {
        let nearPoints = await this.nearerPoints(date);

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
        let x = await nearPoint.getQuantityOfEachPollutantYear(date);
        return x;     
    }

    //Getters
    /*A partir de un punto (this) seleccionado por el usuario la función devolverá todos los puntos ordenados ascendentemente por 
    distancia en una estructura de datos Array of Arrays Ejemplo: [distancia1, PointMap1], [distancia2, PointMap2]*/
   async nearerPoints(date) {
        let mas_prox = 6371000;
        let points = [];
        let point1 = new MeasureStation("08015001", "Franciaa", "urbana" , 41.443584, 2.23889, null );
        let distancia = point1.distance(this.latitude,this.longitud);
        let distanciaTotal = 0;
        let all_points = await dadesObertes.getMeasuresDate(date);
        all_points.forEach(c_point => {
            let m_s = new MeasureStation(c_point.eoiCode, c_point.stationName, c_point.stationType, c_point.latitud, c_point.longitud, null)
            let d = m_s.distance(this.latitude,this.longitud);
            distanciaTotal += d;
            points.push([d,c_point]);
        });
        
        var ordenados = points.sort(function(a, b) {
            return a[0] - b[0];
        });
        return ordenados;
    }

}

module.exports = DataPointMap;