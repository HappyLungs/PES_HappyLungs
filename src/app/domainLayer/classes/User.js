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
        this.profilePicture = null;
    }
}

module.exports = User;
