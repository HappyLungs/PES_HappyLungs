import Comment from "./Comment.js";

 class Article {
    
    constructor (title) {
        //this.user = User.currentUser();
        this.user = "Manolo"
        if(title === undefined || title === "") throw "Un articulo necesita título";
        else this.title = title;
        this.date = new Date();
        this.comments = [];
    }
    

   add_comment(comment){
       console.log(comment)
     this.comments.push(comment);
   }
    

}

const articulo_prueba = new Article("Lo que el viento se llevó");
articulo_prueba.add_comment(new Comment("Me gusta este articulo"))
articulo_prueba.add_comment(new Comment("Odio este articulo"))

console.log(articulo_prueba);