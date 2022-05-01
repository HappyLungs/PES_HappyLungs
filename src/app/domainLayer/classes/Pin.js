//const persistenceCtrl = require("./persistenceLayer/PersistanceCtrl");
//pCtrl = new persistenceCtrl();
export default class Pin {
	//ha de ser aixi, si no diu "TypeError: undefined is not a constructor (evaluating 'new _Pin.default')"
	constructor(title, latitude, longitude, description, media, rating, date, status) {
		this.title = title;
		this.latitude = latitude; //location has {latitude, longitude, title}
		this.longitude = longitude;
		this.description = description;
		this.media = media;
		this.rating = rating;
		this.date = date;
		this.status = status; //"Public" || "Private"

		//add pin to dataBase
		/*let res = {};
		res = await pCtrl.postRequest("/newPin", {
			title: this.name,
			description: this.description,
			latitude: this.location,
			length: this.location,
			date: this.date,
			public: this.status,
			creatorEmail: "falta_afegir_mail@gmail.com"
		});
		console.log(res);
*/
		//ad pin creation to google calendar
		//addCalendarEvent(name, location, description);
	}

	create_pin(name, location, description, media, rating, status) {}

	edit_pin(name, location, description, media, rating, status) {
		//consultar pin a la base de dades i enviar i guardar info nova amb la funció d'editar
		//NOT SURE HOW TO OBTAIN THE ID
		let _id = "623cf0b5f98986305e8af47f";
		let put = {};
		/*put = await pCtrl.putRequest("/pin?_id=" + _id, {
			title: name,
			description: description,
			latitude: location,
			length: location,
			date: date,
			public: status,
			creatorEmail: "falta_afegir_mail@gmail.com"
		});
		console.log(put);
		*/
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

	addCalendarEvent(pinName, location, description) {
		var gapi = window.gapi;
		var CLIENT_ID =
			"940094993561-ul26es9rio610t1gj6161n2n1oqo6nc0.apps.googleusercontent.com";
		var API_KEY = "AIzaSyDnGgm8vf2p1rWoEQPb2OxXREvhIh2-CJk";
		var DISCOVERY_DOCS = [
			"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
		];
		var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

		gapi.client.load("calendar", "v3", () => console.log("loaded calendar"));

		let today = new Date().toISOString().slice(0, 10);
		const isoStrStart = today + 'T12:00:00-00:00';
		const isoStrEnd = today + 'T13:00:00-00:00';

		gapi.auth2
			.getAuthInstance()
			.signIn()
			.then(() => {
				var event = {
					summary: pinName,
					location: location,
					description: description,
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

				request.execute((event) => {
					console.log(event);
					window.open(event.htmlLink);
				});

				/*
      // get events
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(response => {
        const events = response.result.items
        console.log('EVENTS: ', events)
      })
      */
			});
	}

	getActualDate() {}
}

export { Pin };
//ha de ser aixi, si no diu "TypeError: undefined is not a constructor (evaluating 'new _Pin.default')"
