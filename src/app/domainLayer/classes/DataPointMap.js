import { getMeasuresDate, getMeasuresDay } from "./ConsultesMesures.js";
import { MeasureStation } from "./MeasureStation.js";

export default class DataPointMapRegister {

    constructor (latitude, longitud, date) {
       this.latitude = latitude;
       this.longitud = longitud;
       this.date = date;
    }

    //Me pasan un punto un cualquier, buscar entre los mas cercanos y que devuelva 1. Ver la contaminación de ese punto

    getLevelByHour(date, hour) {
        level = 0;

        /*
        let aux = nearerPoints(date, hour);
        let points = aux[0];
        let totalDistance = aux[1];
        
        //esto solo coge dos medidas, de los dos primeros puntos que devuelvan antes
        //Mirar las 4 más cercanas y hacer media por distancia
        points.forEach(station => {
            pollutants = station.getMeasuresByHour(date, hour);
            level += calc.calcLevel(pollutants);
        });
        */

        return level
    }

    getLevelByDay (date) {
        //nearerpoints = nearerPoints(date, hour);
        
        levelSum = 0;
/*
        //esto solo coge dos medidas, de los dos primeros puntos que devuelvan antes
        nearerpoints.forEach(station => {
            pollutantsDay = station.getMeasuresByDate(date, hour);
            foreach {
                //encontrar una media de la cacntidad de cada contaminante del dia
            }
            levelSum += calc.calcLevel(pollutants);
        });

*/
        return levelSum/2;
    }
    


    //Getters
    /*A partir de un punto (this) seleccionado por el usuario la función devolverá todos los puntos ordenados ascendentemente por 
    distancia en una estructura de datos Array of Arrays Ejemplo: [distancia1, PointMap1], [distancia2, PointMap2]*/
   async nearerPoints() {
        let mas_prox = 6371000;
        let points = [];
        let point1 = new MeasureStation("08015001", "Franciaa", "urbana" , 41.443584, 2.23889, null );
        console.log("Datos: " + point1.altitude)
        let distancia = point1.distance(this.latitude,this.longitud);
      //  console.log(distancia);
         let distanciaTotal = 0;
        let all_points = await getMeasuresDate(this.date);
       // console.log(all_points)
        all_points.forEach(c_point => {
            let m_s = new MeasureStation(c_point.eoiCode, c_point.stationName, c_point.stationType, c_point.latitud, c_point.longitud, null)
            //console.log(c_point)
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
