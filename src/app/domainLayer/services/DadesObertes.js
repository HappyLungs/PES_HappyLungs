const axios = require("axios");

let DadesObertes;
(function () {
    let instance;
    DadesObertes = function () {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton
        api_uri = 'https://analisi.transparenciacatalunya.cat/resource/tasf-thgu.json'
    };
}());


DadesObertes.prototype.getMeasuresDay = async function(eoiCode, date) {
    let data;
    await axios({
        method: 'get',
        url: api_uri+'?codi_eoi='+eoiCode+'&data='+date,
        data: {
            "$$app_token" : "66TexGsqu_6szbRMKhNkE64Rx1uzX-dlfb0D",
        }
    }).then(function (res) { 
        data =  res.data;
    });
    return data;
}



DadesObertes.prototype.getMeasuresDate =  async function(date) {
    let data;
    await axios({
        method: 'get',
        url: api_uri+'?data='+date,
        data: {
            "$$app_token" : "66TexGsqu_6szbRMKhNkE64Rx1uzX-dlfb0D",
        }
    }).then(function (res) { 
        data =  res.data;
    });
    return data;
}

DadesObertes.prototype.getMeasuresMultipleDays = async function(eoiCode, startDate, endDate) {
    let data;
    await axios({
        method: 'get',
        url: api_uri+"?$where=data between '"+startDate+"' and '"+endDate+"'&codi_eoi="+eoiCode,//api_uri+'?codi_eoi='+eoiCode+'&$where=data between'+startDate+' and '+endDate,
        data: {
            "$$app_token" : "66TexGsqu_6szbRMKhNkE64Rx1uzX-dlfb0D",
        }
    }).then(function (res) { 
        data =  res.data;
    });
    return data;
}


module.exports = DadesObertes;
