const PersistenceCtrl = require("../../persistenceLayer/PersistenceCtrl");
persistCtrl = new PersistenceCtrl();
class User {
    
    //Constructors
    constructor (name, email, password, birthdate) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.points = 0;
        this.language = "ca"; // "es", "en"
        this.healthStatus = [false, false, false]; //cardiorespiratory problems, pregnant, elderly
        this.notifications = true;
        this.profilePicture = "https://www.congresodelasemfyc.com/assets/imgs/default/default-logo.jpg";
    }

    async register (confirmPassword) {
        return await persistCtrl.postRequest("/register", {
            "name": this.name,
            "email": this.email,
            "password": this.password,
            "confirmPassword": confirmPassword,
            "birthdate": this.birthdate
        });
    }

    async registerGoogle (userGoogleData) {
        return await persistCtrl.postRequest("/registerGoogle", {
            "name": userGoogleData.given_name,
            "email": this.email,
            "language": userGoogleData.locale,
            "profilePicture": userGoogleData.picture
        })
    }

    async login () {
        return await persistCtrl.getRequest("/login", {
            "email": this.email,
            "password": this.password
        });
    }

    async loginGoogle (userGoogleData) {
        let res = await persistCtrl.getRequest("/loginGoogle", {
            "email": this.email
        });
        if (res.status == 204) this.registerGoogle(userGoogleData);
    }

    async delete () {
        return await persistCtrl.postRequest("/deleteUser", {
            "email": this.email
        });
    }

    async changePassword (oldPassword, newPassword) {
        return await persistCtrl.putRequest("/changePassword", {
            "email": this.email,
            "oldPassword": oldPassword,
            "newPassword": newPassword
        });
    }

    async update (name, points, language, healthStatus, notifications, profilePicture) {
        return await persistCtrl.postRequest("/updateUser", {
            "name": name,
            "email": this.email,
            "points": points,
            "language": language,
            "healthStatus": healthStatus,
            "notifications": notifications,
            "profilePicture": profilePicture
        });
    }

}

module.exports = User;
