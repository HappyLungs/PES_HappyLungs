const express = require('express')
const Joi = require('joi');
//const date = require('joi/lib/types/date');
const DataPointMap = require('../app/domainLayer/classes/DataPointMap');
const app = express();
const sanitizeHtml = require("sanitize-html")


app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
]
app.get('/', (req,res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req,res) => {
   res.send(courses)
});

app.get('/api/contamination/:longitude/:latitude/:date', async (req,res) => {
   

   if(isNaN(parseInt(req.params.longitude)))  {
       res.status(400).send('Parametro de longitud no introducido correctamente');
       return;
   }
   if(isNaN(parseInt(req.params.latitude)))  {
    
    res.status(400).send('Parametro de latitud no introducido correctamente');
    return; 
    }
    let fecha = new Date(req.params.date);

    if(req.params.date === 'today') fecha = new Date();

   
   if(isNaN(fecha)) {
    res.status(400).send(sanitizeHtml(`El parametro: ${req.params.date} no es válido para el atributo fecha`));
    return;  
   } 



    const punto = new DataPointMap((req.params.latitude), (req.params.longitude));
    const valor_contaminacion = await punto.getDayLevel(fecha)
    console.log(valor_contaminacion)

    
    if(!valor_contaminacion) res.status(404).send('No existe el ID') // 404 Error
    else res.send(valor_contaminacion)
})

app.post('/api/article', (req,res) => {
    
    const schema = {
        name: Joi.string().min(3).required()

    };

   const result =  Joi.validate(req.body,schema)
   console.log(result)
 
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(JSON.parse(course));
})

/*
 Lookup de course
 If not existing, return 404

 Validate
 If invalid, return 400 - Bad Request 

Update course
Return the update course
*/

app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c =>   c.id === parseInt(req.params.id));
    
    if(!course) res.status(404).send('No existe el ID') // 404 Error

    const schema = {
        name: Joi.string().min(3).required()

    };

   const result =  Joi.validate(req.body,schema)
   console.log(result)
 
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

 course.name = req.body.name;
 res.send(course);

})
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port} `));
