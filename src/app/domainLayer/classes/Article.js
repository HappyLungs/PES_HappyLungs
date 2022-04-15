import Comment from "./Comment.js";
import BaseClass from "./BaseClass.js";

 class Article extends BaseClass{
    
    constructor (title, userID) {
        super();
        this.userID = userID
        if(title === undefined || title === "") throw "Un articulo necesita título";
        else this.title = title;
        this.date = new Date();
        this.comments = [];
    }
    

   add_comment(comment){
     this.comments.push(comment);


   }
    

}

const articulo_prueba = new Article("Lo que el viento se llevó");
articulo_prueba.add_comment(new Comment("Me gusta este articulo"))
articulo_prueba.add_comment(new Comment("Odio este articulo"))

console.log(articulo_prueba);