const LanguageEnum = Object.freeze({"english":1, "catalan":2, "spanish":3});
const HealthStatusEnum = Object.freeze({"None":1, "RespiratoryDisease":2, "Pregnant":3, "OldPeople":4})
export default class User {
    
    //Constructors
    constructor (name, email, password, birthdate) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.points = 0;
        this.language = LanguageEnum.catalan;
        this.healthStatus = HealthStatusEnum.None;
        this.profilePicture = null;
    }
}

module.exports = User;
