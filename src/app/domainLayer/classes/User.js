import BaseClass from "./BaseClass.js";

export default class User extends BaseClass {
    

    constructor (email) {
        super();
        this.email = email;
    }
    
    //Getters
    get UserMail () {
        return this.email;
    }

    get userID() {
        return this.id;
    }

}