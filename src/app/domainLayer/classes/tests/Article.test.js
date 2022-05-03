import Article from '../Article';
import User from "../User";
import Comment from "../Comment";

const usuario = new User("alexsoriano@hotmail.es");

const id_user = usuario.userID;

let articleTest = new Article("Lo que el viento se llevó", id_user);

test('test add comment',
    () => {
        let comment1 = new Comment("Me gusta este articulo");
        let comment2= new Comment("Odio este articulo");
        articleTest.add_comment(comment1);
        articleTest.add_comment(comment2);
        expect(articleTest.getComments).toEqual([comment1,comment2]);
});