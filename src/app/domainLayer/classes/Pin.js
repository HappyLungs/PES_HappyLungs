export default class Pin {
    constructor(name, location, description, media, rating, private) {
      this.name = name;
      this.location = location;
      this.description = description;
      this.media = media;
      this.rating = rating;
      this.private = private;
    }
  
    create_pin(nameeeeeee, location, description, media, rating, private) {}
    
    //Getters
    get recomended_IDs() {
        return this.show_recomended_IDs;
    }

    get charts(){
        return this.show_charts;
    }

    show_recomended_IDs(){}
  
    show_charts(){}
  }