import BaseClass from "./BaseClass.js";

export default class Article extends BaseClass {
  constructor(title, userID) {
    super();
    if(userID === undefined || userID === "") throw "Un articulo necesita un ID de usuario"
    else this.userID = userID;
    if (title === undefined || title === "")
      throw "Un articulo necesita título";
    else this.title = title;
    this.date = new Date();
    this.comments = [];
  }

  //Getters

  get articleID() {
    return this.id;
  }

  get user() {
    return this.userID;
  }

  get getTitle() {
    return this.title;
  }

  get getDate() {
    return this.date;
  }

  get getComments() {
    return this.comments;
  }


  add_comment(comment) {
    this.comments.push(comment);
  }
}

/*const usuario = new User("alexsoriano@hotmail.es");

const id_user = usuario.userID;

const articulo_prueba = new Article("Lo que el viento se llevó", id_user);
articulo_prueba.add_comment(new Comment("Me gusta este articulo"));
articulo_prueba.add_comment(new Comment("Odio este articulo"));

console.log(articulo_prueba);*/
