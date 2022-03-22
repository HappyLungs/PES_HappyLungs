//import axios from 'axios';
const axios = require("axios")

async function getMeasures (eoiCode, date) {
    let data;
    await axios({
        method: 'get',
        url: `https://analisi.transparenciacatalunya.cat/resource/tasf-thgu.json?$order=data DESC&$limit=100000`,
        data: {
            "$$app_token" : "66TexGsqu_6szbRMKhNkE64Rx1uzX-dlfb0D",
        }
    }).then(function (res) { 
        data =  res.data;
    });
    console.log(data);
}

getMeasures("a", "b");
/* getMeasures("08015001", "1991-01-01T00:00:00.000");

async function getMeasures (eoiCode, date) {
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
    console.log(data);
}

getMeasures("08015001", "1991-01-01T00:00:00.000"); */