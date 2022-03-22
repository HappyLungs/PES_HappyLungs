const mongodb = require("mongodb");
const axios = require("axios");

let dataPointMap = new Map();
let pollutantDayMeasure = new Map();
let measure = new Map();

let id = 0; //first id for the database

function getNZero(number) {
    let s = "";
    for (let i = 0; i < number;++i) s += "0";
    return s;
}


async function getData() {
    //Data since 5 years ago
    let data = {};
    await axios({
        method: 'get',
        url: `https://analisi.transparenciacatalunya.cat/resource/tasf-thgu.json?$where=data >= '2017-01-01T00:00:00.000' &$limit=10000000`,
        data: {
            "$$app_token" : "66TexGsqu_6szbRMKhNkE64Rx1uzX-dlfb0D",
        }
    }).then(function (res) { 
        data =  res.data;
    });
    return data;
}


async function insertData () {
    let data = await getData();
    data.map(element => {
        if (!dataPointMap.has(element.codi_eoi)) {
            let dpm = {
                _id: mongodb.ObjectId.createFromHexString(getNZero(24 - id.toString(16).length) + id.toString(16)),
                eoiCode: element.codi_eoi,
                stationName: element.nom_estacio,
                stationType: element.tipus_estacio,
                altitude: element.altitud,
                latitude: element.latitud,
                length: element.longitud,
                georeference: element.geocoded_column.coordinates,
            }
            ++id;
            let pdm = {
                _id: mongodb.ObjectId.createFromHexString(getNZero(24 - id.toString(16).length) + id.toString(16)),
                dataPointMap: dpm._id,
                pollutant: element.contaminant,
                date: element.data,
                units: element.unitats
            }
            ++id;
            let measures = [];
            for(let i = 0; i < 25; ++i) {
                let searchHour = (i < 10) ? ("0" + i.toString()) : i.toString();
                let quant = (element["h"+searchHour] !== "" && element["h"+searchHour] !== undefined) ? element["h"+searchHour] : null;
                let m = {
                    _id: mongodb.ObjectId.createFromHexString(getNZero(24 - id.toString(16).length) + id.toString(16)),
                    hour: searchHour,
                    quantity: quant,
                    pollutantDayMeasure: pdm._id
                }
                measures.push(m);
                ++id;
            }
            dataPointMap.set(element.codi_eoi, dpm);
            pollutantDayMeasure.set(dpm.eoiCode, new Map([[pdm.date, pdm]]));
            measure.set(dpm.eoiCode, new Map([[pdm.date, measures]]));
            
        } else {
            let pdm = {
                _id: mongodb.ObjectId.createFromHexString(getNZero(24 - id.toString(16).length) + id.toString(16)),
                date: element.data,
                dataPointMap: dataPointMap.get(element.codi_eoi)._id,
                pollutant: element.contaminant,
                units: element.unitats
            }
            ++id;
            let measures = [];
            for(let i = 0; i < 25; ++i) {
                let searchHour = (i < 10) ? ("0" + i.toString()) : i.toString();
                let quant = (element["h"+searchHour] !== "" && element["h"+searchHour] !== undefined) ? element["h"+searchHour] : null;
                let m = {
                    _id: mongodb.ObjectId.createFromHexString(getNZero(24 - id.toString(16).length) + id.toString(16)),
                    hour: searchHour,
                    quantity: quant,
                    pollutantDayMeasure: pdm._id
                }
                measures.push(m);
                ++id;
            }
            pollutantDayMeasure.set(element.codi_eoi, new Map([[pdm.date, pdm]]));
            measure.set(element.codi_eoi, new Map([[pdm.date, measures]]));
        }
    });
    insert();
}


async function insert () {
    let insertions = [];
    for (let [key, value] of dataPointMap) {
        insertions.push(value);
    }

    await axios.post('http://localhost:2000/v1/insertMultipleDataPointMap', {
    params: { insertions }
    }, {
        headers: {
            lfuzcudDtC36EFQW: "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            authorization: "pes2022"
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });

    insertions = [];
    for (let [key, value] of pollutantDayMeasure) {
        for (let [key2, value2] of value) {
            insertions.push(value2);
        }
    }

    await axios.post('http://localhost:2000/v1/insertMultiplePollutantDayMeasure', {
    params: { insertions }
    }, {
        headers: {
            lfuzcudDtC36EFQW: "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            authorization: "pes2022"
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });

    insertions = [];
    for (let [key, value] of measure) {
        for (let [key2, value2] of value) {
            insertions = insertions.concat(value2);
        }
    }

    await axios.post('http://localhost:2000/v1/insertMultipleMeasures', {
    params: { insertions }
    }, {
        headers: {
            lfuzcudDtC36EFQW: "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            authorization: "pes2022"
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}

insertData();