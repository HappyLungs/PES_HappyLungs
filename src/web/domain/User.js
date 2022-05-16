class User {
    
    constructor(params) {
        this.username = params.username;
        this.email = params.email;
        this.picture = params.picture;
        this.blocked = params.blocked;
        this.pins = params.pins;
        this.ranking = params.ranking;
        this.chats = params.chats;
        this.reported = params.reported;
    }

}

module.exports = User;