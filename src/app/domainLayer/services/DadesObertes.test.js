const DadesObertesTest = require("./DadesObertes");

let dadesObertes=new DadesObertesTest();

test('test get map data', async ()=> {
    let dades=await dadesObertes.getMeasuresDate(new Date());
    //console.log(dades);
});