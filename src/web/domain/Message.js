class User {
    
    constructor(params) {
        this.email = params.email;
        this.reportantUsername = params.reportantUsername;
        this.text = params.text;
        this.state = params.state; //{"pending","accepted","declined"}
        this.date = params.date;
        this.hour = params.hour;
    }

}

module.exports = User;