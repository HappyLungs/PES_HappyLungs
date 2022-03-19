export default class Pin {
    constructor(name, location, description, media, rating, public) {
      this.name = name;
      this.location = location;
      this.description = description;
      this.media = media;
      this.rating = rating;
      this.public = public;
    }
  
    create_pin(name, location, description, media, rating, public) {}
    
    //Getters
    get recomended_IDs() {
        return this.show_recomended_IDs;
    }

    get charts() {
        return this.show_charts;
    }

      //returns true if public pin
    get public() {
        return this.public;
    }

    show_recomended_IDs(){}
  
    show_charts() {}
  }