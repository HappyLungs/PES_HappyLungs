export default class DataPointMapRegister {

    constructor (altitude, latitude) {
        this.altitude;
        this.latitude;
    }

    getLevelByHour(date, hour) {
        nearerpoints = nearerPoints(date, hour);
        
        levelSum = 0;

        //esto solo coge dos medidas, de los dos primeros puntos que devuelvan antes
        //Mirar las 4 más cercanas y hacer media por distancia
        nearerpoints.forEach(station => {
            pollutants = station.getMeasuresByHour(date, hour);
            levelSum += calc.calcLevel(pollutants);
        });


        return 
    }

    getLevelByDay (date) {
        nearerpoints = nearerPoints(date, hour);
        
        levelSum = 0;

        //esto solo coge dos medidas, de los dos primeros puntos que devuelvan antes
        nearerpoints.forEach(station => {
            pollutantsDay = station.getMeasuresByDate(date, hour);
            foreach {
                //encontrar una media de la cacntidad de cada contaminante del dia
            }
            levelSum += calc.calcLevel(pollutants);
        });


        return levelSum/2;
    }
    















    calcPollutionLevel(p1,p2, latitud, longitud){ 
        let plevel;
            
        /*
        ***
        Some math
        ***
        */
                
        return plevel;
    }
    
    calcLevelDay(date, latitud, longitud) {

    }

    //Getters
    /*A partir de un punto (this) seleccionado por el usuario la función devolverá todos los puntos ordenados ascendentemente por 
    distancia en una estructura de datos Array of Arrays Ejemplo: [distancia1, PointMap1], [distancia2, PointMap2]*/
    nearerPoints(latitud, longitud) {
        let mas_prox = 6371000;
        let nearest = new DataPointMap();
        let points = [];
        let point1 = new DataPointMap("08015001", "Franciaa", "1991-02-01T00:00:00.000", 6, "CO", "mg/m3", "traffic", "urban", "08015", "Badalona", 13,  "Barcelonès", [0.4, 0.3], 6, 41.443584, 2.23889 );
        let point2 = new DataPointMap("08015001", "Españaaa", "1991-02-01T00:00:00.000", 6, "CO", "mg/m3", "traffic", "urban", "08015", "Badalona", 13,  "Barcelonès", [0.4, 0.3], 6, 42.392001, 2.8888);
        let point3 = new DataPointMap("08015001", "Alemaniaaaa", "1991-02-01T00:00:00.000", 6, "CO", "mg/m3", "traffic", "urban", "08015", "Badalona", 13,  "Barcelonès", [0.4, 0.3], 6, 56.392001, 7.8888);
        let point4 = new DataPointMap("08015001", "Italia", "1991-02-01T00:00:00.000", 6, "CO", "mg/m3", "traffic", "urban", "08015", "Badalona", 13,  "Barcelonès", [0.4, 0.3], 6, 38.392001, 5.8888);

        let all_points = [point1, point2,point3, point4];
            all_points.forEach(c_point => {
            console.log(c_point)
            let d = c_point.distance(latitud,longitud);
                           
            points.push([d,c_point]);
        });
        
        var ordenados = points.sort(function(a, b) {
            return a[0] - b[0];
        });
        return ordenados;
    }
        
    distance(lat2,lon2) {
        var lat1 = this.latitud;
        var lon1 = this.longitud;
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
d = new DataPointMap(..)
d.getInfo("17/")