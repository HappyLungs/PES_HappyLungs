const DataPointMap = require("../../src/app/domainLayer/classes/DataPointMap");
import sanitizeHtml from "sanitize-html";


exports.find = async (req, res) => {
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
 
};

   

