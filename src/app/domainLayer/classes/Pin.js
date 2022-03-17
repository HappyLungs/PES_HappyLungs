export default class Pin {
    constructor(name, location, description, media, rating, privat) {
      this.name = name;
      this.location = location;
      this.description = description;
      this.media = media;
      this.rating = rating;
      this.privat = privat;
    }
  
    create_pin(nameeeeeee, location, description, media, rating, privat) {}
    
    //Getters
    get recomended_IDs() {
        return this.show_recomended_IDs;
    }

    get charts() {
        return this.show_charts;
    }

      //returns true if private pin
    get privat() {
        return this.privat;
    }

    show_recomended_IDs(){}
  
    show_charts() {}
  }