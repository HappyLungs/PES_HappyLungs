import BaseClass from './BaseClass.js';

export default class Comment extends BaseClass{

   constructor(body){
    super();
     this.body = body;
     this.date = new Date();
   }

}
