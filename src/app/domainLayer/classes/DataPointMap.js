export default class DataPointMap {


    constructor (pullitionLevel, pollutant, location, coordinates, pollutantType) {
        this.pullitionLevel = pullitionLevel;
        this.pollutant = pollutant;
        this.location = location;
        this.coordinates = coordinates;
        this.pollutantType = pollutantType;
    }
    
    //Getters
   
    get NearerPoints() {
        h1 = new DataPointMap("...");
        h2 = new DataPointMap("...");

        return [h1,h2];
    }
}