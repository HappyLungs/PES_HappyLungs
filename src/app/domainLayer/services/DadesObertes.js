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

dateApiConverter = function (date) {
    console.log(date)
    const lastweek = new Date(date)
    lastweek.setDate(lastweek.getDate() - 7)
    console.log(lastweek)

    let year = lastweek.getFullYear();
    let month = (lastweek.getMonth()+1) < 10 ? "0"+(lastweek.getMonth()+1) : lastweek.getMonth()+1;
    let day = lastweek.getDate() < 10 ? "0"+lastweek.getDate() : lastweek.getDate();

    const apiDate = year+"-"+month+"-"+day+"T00:00:00.000";
    console.log(apiDate)
    return apiDate;
}

DadesObertes.prototype.getMeasuresDay = async function(eoiCode, date) {
    let data;
    let apiDate = dateApiConverter(date);
    await axios({
        method: 'get',
        url: api_uri+'?codi_eoi='+eoiCode+'&data='+apiDate,
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
    let apiDate = dateApiConverter(date);
    await axios({
        method: 'get',
        url: api_uri+'?data='+apiDate,
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
    let startApiDate = dateApiConverter(startDate) ;
    let endApiDate = dateApiConverter(endDate);
    await axios({
        method: 'get',
        url: api_uri+"?$where=data between '"+startApiDate+"' and '"+endApiDate+"'&codi_eoi="+eoiCode,//api_uri+'?codi_eoi='+eoiCode+'&$where=data between'+startDate+' and '+endDate,
        data: {
            "$$app_token" : "66TexGsqu_6szbRMKhNkE64Rx1uzX-dlfb0D",
        }
    }).then(function (res) { 
        data =  res.data;
    });
    return data;
}


module.exports = DadesObertes;
