const axios = require("axios");

let DadesObertes;
(function () {
    let instance;
    DadesObertes = function () {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton
        let api_uri = 'https://analisi.transparenciacatalunya.cat/resource/tasf-thgu.json'
    };
}());

/**
 * Converts "date" into the type of date that Dades Obertes API accepts
 * @param {*} date [type: Date] date to convert
 * @returns date as: "yyyy-mm-ddT00:00:00.000"
 */
function dateApiConverter (date) {
    const lastweek = new Date(date)
    lastweek.setDate(lastweek.getDate() - 7)

    let year = lastweek.getFullYear();
    let month = (lastweek.getMonth()+1) < 10 ? "0"+(lastweek.getMonth()+1) : lastweek.getMonth()+1;
    let day = lastweek.getDate() < 10 ? "0"+lastweek.getDate() : lastweek.getDate();

    return year + "-" + month + "-" + day + "T00:00:00.000";
}

/**
 * Gets all measures with codi_eoi = eoiCode and data = "date"
 * @param {String} eoiCode code of the Measure Station
 * @param {Date} date date of the measures wanted
 * @returns all measures with codi_eoi = eoiCode and data = "date"
 */
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


/**
 * Gets all measures with data = "date"
 * @param {Date} date date of the measures wanted
 * @returns all measures with data = "date"
 */
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

/**
 * Gets all measures with codi_eoi = eoiCode and data between startDate and endDate
 * @param {*} eoiCode code of the Measure Station
 * @param {*} startDate initial date of the measures wanted
 * @param {*} endDate final date of the measures wanted
 * @returns all measures with codi_eoi = eoiCode and data between startDate and endDate
 */
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
