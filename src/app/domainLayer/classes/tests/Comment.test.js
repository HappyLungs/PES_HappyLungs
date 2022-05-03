import Comment from '../Comment';

let commentTest= new Comment("Hola esto es un test");

test('test comment body',
    () => {
        expect(commentTest.getBody).toBe('Hola esto es un test');
    });