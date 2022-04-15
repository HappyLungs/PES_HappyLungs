
const LanguageEnum = Object.freeze({"english":1, "catalan":2, "spanish":3});
const HealthStatusEnum = Object.freeze({"None":1, "RespiratoryDisease":2, "Pregnant":3, "OldPeople":4})
export default class User {
    
    //Constructors
    constructor (name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = null;
        this.birthday = null;
        this.location = null;
        this.points = 0;
        this.language = LanguageEnum.english;
        this.healthStatus = HealthStatusEnum.None;
    }

    constructor (name, email, password, phone, birthday, location, language, healthStatus) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.birthday = birthday;
        this.location = location;
        this.points = 0;
        this.language = language;
        this.healthStatus = healthStatus;
    }
    
    //Getters
    getName () {
        return this.name;
    }

    getEmail () {
        return this.email;
    }

    getLocation() {
        return this.location;
    }

    getHealthStatus () {
        return this.healthStatus;
    }
}

module.exports = User;