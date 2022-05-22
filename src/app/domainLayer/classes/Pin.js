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

	}
}
module.exports = Pin;