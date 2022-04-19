export default class User {
	constructor(username, email, points, healthState, profilePicture) {
		this.username = username;
		this.email = email;
		this.points = points;
		this.healthState = healthState;
		this.profilePicture = profilePicture;
	}

	//Getters
	get UserMail() {
		return this.email;
	}
}
export { User };
