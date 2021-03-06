const DadesObertes = require("../services/DadesObertes");
const MeasureStation = require("./MeasureStation.js");

const dadesObertes = new DadesObertes();

class DataPointMap {
	constructor(latitude, longitud) {
		this.latitude = latitude;
		this.longitud = longitud;
	}

	/**
	 *
	 * @param {Date} date
	 * @param {Integer} hour
	 * @returns {Integer} pollution level at the date "date" and hour "hour" of the nearer Measure Station.
	 */
	async getHourLevel(date, hour) {
		const nearPoint = await this.nearestPoint();
		if (nearPoint === undefined) {
			console.log("fatal");
		}
		return nearPoint.getHourLevel(date, hour);
	}

	/**
	 * Calculates the pollution level at every hour of the day
	 * @param {Date} date date
	 * @returns {Array<Integer>} pollution level at every hour of a day of the nearer Measure Station.
	 */
	async getDayLevel(date) {
		let nearPoints = await this.nearerPoints(date);

		let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
		return nearPoint.getDayLevel(date);
	}

	async getDayLevel_byRadius(radius) {
		let nearPoints = await this.radiusPoints(radius);

		let data = {
			name: "null",
			value: 0,
			latitude: this.latitude,
			longitude:  this.longitud
		};
		let totalData = [];

		const datos = await Promise.all(
			nearPoints.map(async (point) => {
				let nearPoint2 = new MeasureStation(point[1].codi_eoi);
				const valor_medio = await nearPoint2
					.getDayLevel(new Date())
					.then((res) => {
						let valor = 0;

						res.levels.forEach((value) => {
							if (value != undefined) valor += value;
						});
						data = Math.round(valor / res.levels.length);
						return data;
					});
				data = {
					...data,
					name: point[1].nom_estacio,
					value: valor_medio,
					latitude: point[1].latitud,
					longitude: point[1].longitud,
					distance: point[0]
				};
				totalData = [...totalData, data];
				return data;
			})
		);

		return datos;
	}

	/**
	 * Calculates the pollution level at every day of a week
	 * @param {Date} date date
	 * @returns {Array<Integer>} pollution level of the latest 7 days from date of the nearer Measure Station.
	 */
	async getWeekLevel(date) {
		let nearPoints = await this.nearerPoints(date);

		let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
		return nearPoint.getWeekLevel(date);
	}
	/**
	 * Calculates the pollution level at every day of a month
	 * @param {Date} date date
	 * @returns {Array<Integer>} pollution level of the latest 30 days from date of the nearer Measure Station.
	 */
	async getMonthLevel(date) {
		let nearPoints = await this.nearerPoints(date);

		let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
		return nearPoint.getMonthLevel(date);
	}

	async getYearLevel(date) {
		let puntos_cercanos = await this.nearerPoints(date);

		let punto_cercano = new MeasureStation(puntos_cercanos[0][1].codi_eoi);
		return punto_cercano.getYearLevel(date);
	}

	//PIE CHART GETTERS
        
   /**
     * Calculates the quantities of each pollutant on a date.
     * @param {Date} date
     * @returns Returns the quantities of each pollutant on a date of the nearer Measure Station.
     */
    async getPollutantsQuantDay (date) {
        let nearPoints = await this.nearerPoints(date);

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
       return await nearPoint.getQuantityOfEachPollutantAtDay(date);
    }
   /**
     * Calculates the quantities of each pollutant on a week.
     * @param {Date} date
     * @returns Returns the quantities of each pollutant on a week of the nearer Measure Station.
     */
    async getPollutantsQuantWeek (date) {
        let nearPoints = await this.nearerPoints(date);

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
       return await nearPoint.getQuantityOfEachPollutantAtWeek(date);
    }
    /**
     * Calculates the quantities of each pollutant on a month.
     * @param {*} date
     * @returns Returns the quantities of each pollutant on a month of the nearer Measure Station.
     */
    async getPollutantsQuantMonth (date) {
        let nearPoints = await this.nearerPoints(date);

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
     return await nearPoint.getQuantityOfEachPollutantAtMonth(date);
    }
    /**
     * Calculates the quantities of each pollutant on a Year.
     * @param {*} date
     * @returns Returns the quantities of each pollutant on a Year of the nearer Measure Station..
     */
    async getPollutantsQuantYear (date) {
        let nearPoints = await this.nearerPoints(date);

        let nearPoint = new MeasureStation(nearPoints[0][1].codi_eoi);
             return await nearPoint.getQuantityOfEachPollutantAtYear(date);
    }

	//Getters
	/**
   * Get the nearest Measure Stations ordered.
   * @returns {[distance1, Point1], [distance2, Point2]} Starting from a point (this) selected by the user, the function will return all the points sorted ascending by
   distance in an Array of Arrays data structure.
   * @param date
   */
	async nearerPoints(date) {
		//let mas_prox = 6371000;
		let points = [];
		//let point1 = new MeasureStation("08015001", "Franciaa", "urbana" , 41.443584, 2.23889, null );
		//let distancia = point1.distance(this.latitude,this.longitud);
		let distanciaTotal = 0;
		let all_points = await dadesObertes.getMeasuresDate(date);
		all_points.forEach((c_point) => {
			let m_s = new MeasureStation(
				c_point.codi_eoi,
				c_point.nom_estacio,
				c_point.tipus_estacio,
				c_point.latitud,
				c_point.longitud,
				null
			);
			let d = m_s.distance(this.latitude, this.longitud);
			distanciaTotal += d;
			points.push([d, c_point]);
		});

		return points.sort(function (a, b) {
			return a[0] - b[0];
		});
	}

	async radiusPoints(radius) {
		//let mas_prox = 6371000;
		let points = [];
		//let point1 = new MeasureStation("08015001", "Franciaa", "urbana" , 41.443584, 2.23889, null );
		//let distancia = point1.distance(this.latitude,this.longitud);
		let distanciaTotal = 0;
		let all_points = await dadesObertes.getMeasuresDate(new Date());

		all_points.forEach((c_point) => {
			let m_s = new MeasureStation(
				c_point.eoiCode,
				c_point.stationName,
				c_point.stationType,
				c_point.latitud,
				c_point.longitud,
				null
			);
			let d = m_s.distance(this.latitude, this.longitud);
			if (d <= radius) points.push([d, c_point]);
		});

		var seen = {};

		return points.filter(function (point) {
			return seen.hasOwnProperty(point[1].codi_eoi)
				? false
				: (seen[point[1].codi_eoi] = true);
		});
	}
	getMeasureStation(eoiCode) {
		if (MeasureStation.Stations !== undefined)
			return MeasureStation.Stations.find((element) => (element.eoi === eoiCode));
		return undefined;
	}

	async nearestPoint() {
		let point;
		let mindist=9999999;
		let all_points = MeasureStation.Stations;
		all_points.forEach((m_s) => {
			let d = m_s.station.distance(this.latitude, this.longitud);
			if(d<mindist){
				point=m_s.station;
				mindist=d;
			}
		});

		return point;
	}
}

module.exports = DataPointMap;
