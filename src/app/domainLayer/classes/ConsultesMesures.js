import axios from 'axios';

async function getMeasuresDay (eoiCode, date, hour) {
    let data;
    await axios({
        method: 'get',
        url: 'https://analisi.transparenciacatalunya.cat/resource/tasf-thgu.json?codi_eoi='+eoiCode+'&data='+date,
        data: {
            "$$app_token" : "66TexGsqu_6szbRMKhNkE64Rx1uzX-dlfb0D",
        }
    }).then(function (res) { 
        data =  res.data;
    });
    return data;
}

/*
let eoiCode = "08089005";
let date = "2022-03-16T00:00:00.000"
let hour = 6;

let datos = await dadesObertesDia(eoiCode, date, hour)
console.log("datos:");
console.log(datos);
*/

export {getMeasuresDay}