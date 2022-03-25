import { getRequest, postRequest, putRequest} from './persistence.controller.mjs';

//  PINS METHODS EXAMPLE

//  CREAR PIN
/* 
let createPin = {
    "title": "Un altre pin",
    "description": "Descripció",
    "latitude": 2,
    "length": 3,
    "date": "03/07/2022",
    "rate": 3,
    "public": true,
    "creatorEmail": "ivan.jimeno@estudiantat.upc.edu"
}
let response = await postRequest("/newPin", createPin);
console.log(response);
 */

//  EDITAR PIN
/* 
let put = {
    "title": "Títol editat v4",
    "description": "Descripció",
    "latitude": 2,
    "length": 3,
    "date": "2022-03-06T23:00:00.000Z",
    "rate": 3,
    "public": true,
    "creatorEmail": "ivan.jimeno@estudiantat.upc.edu",
    "images": []
  }

let _id = "623cf0b5f98986305e8af47f";
let response = await putRequest("/pin?_id=" + _id, put);
console.log(response);
 */