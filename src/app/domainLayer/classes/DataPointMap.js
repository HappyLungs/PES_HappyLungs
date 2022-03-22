import { getMeasuresDate, getMeasuresDay } from "./ConsultesMesures.js";
import { MeasureStation } from "./MeasureStation.js";

export default class DataPointMap {

    constructor (latitude, longitud, date) {
       this.latitude = latitude;
       this.longitud = longitud;
       this.date = date;
    }

    //Me pasan un punto un cualquier, buscar entre los mas cercanos y que devuelva 1. Ver la contaminación de ese punto

  async  getLevelByHour(date, hour) {
        let puntos_cercanos = await this.nearerPoints();

        let punto_cercano = new MeasureStation(puntos_cercanos[0][1].codi_eoi);
        let x = await punto_cercano.getMeasuresByDay(date);
        return x.get(hour);     
    }

   async getLevelByDay (date) {
        

     let puntos_cercanos = await this.nearerPoints();

     let punto_cercano = new MeasureStation(puntos_cercanos[0][1].codi_eoi);
     let x = await punto_cercano.getMeasuresByDay(date);
     return x;     
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
         let distanciaTotal = 0;
        let all_points = await getMeasuresDate(this.date);
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