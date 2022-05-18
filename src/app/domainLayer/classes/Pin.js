class Pin {
	constructor(
		title,
		latitude,
		longitude,
		locationTitle,
		description,
		media,
		rating,
		status,
		creatorEmail
	) {
		this.title = title;
		this.latitude = latitude; //location has {latitude, longitude, title}
		this.longitude = longitude;
		this.locationTitle = locationTitle;
		this.description = description;
		this.media = media;
		this.rating = rating;
		this.status = status; //"Public" || "Private"
		this.creatorEmail = creatorEmail;
	}

	create_pin(name, location, description, media, rating, status) {}

	edit_pin(name, location, description, media, rating, status) {
		//consultar pin a la base de dades i enviar i guardar info nova amb la funció d'editar
		//NOT SURE HOW TO OBTAIN THE ID
		let _id = "623cf0b5f98986305e8af47f";
		let put = {};
	}

	//Getters
	get recomended_IDs() {
		return this.show_recomended_IDs;
	}

	get charts() {
		return this.show_charts;
	}

	getLocationPins(location) {
		//returns pins around the location
		//speaks with DB
	}

	show_recomended_IDs() {}

	show_charts() {}

	//addCalendarEvent(date) {
	addCalendarEvent() {		
		var gapi = window.gapi;
		var CLIENT_ID = "494906188598-m2om2vv1siovnkmim1bbhkatqt4ngrjp.apps.googleusercontent.com"
  		var API_KEY = "AIzaSyB9WYI1_sLF-I3s5Z7ZChw7bJM6jAKwc4I"
		var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
		var SCOPES = "https://www.googleapis.com/auth/calendar";

		gapi.load('client:auth2', () => {
			gapi.client.init({
			  apiKey: API_KEY,
			  clientId: CLIENT_ID,
			  discoveryDocs: DISCOVERY_DOCS,
			  scope: SCOPES,
			})

			gapi.client.load("calendar", "v3", () => console.log("google calendar loaded"));

			let today = new Date().toISOString().slice(0, 10);
			const isoStrStart = today + "T12:00:00-00:00";
			const isoStrEnd = today + "T13:00:00-00:00";

			gapi.auth2.getAuthInstance().signIn().then(() => {
				var event = {
					summary: this.title,
					location: this.locationTitle,
					description: this.description,

					start: {
						dateTime: isoStrStart,
					},
					end: {
						dateTime: isoStrEnd,
					},
				};

				var request = gapi.client.calendar.events.insert({
					calendarId: "primary",
					resource: event,
				});
			})
		})
	}
}
module.exports = Pin;
//ha de ser aixi, si no diu "TypeError: undefined is not a constructor (evaluating 'new _Pin.default')"
