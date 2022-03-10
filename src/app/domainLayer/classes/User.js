export default class User {
    email

    constructor (email) {
        this.email = email;
    }
    
    //Getters
    get UserMail () {
        return this.email;
    }
}