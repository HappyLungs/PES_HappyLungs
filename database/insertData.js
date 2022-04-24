/* const mongodb = require("mongodb");
const axios = require("axios");
require('fs');
require('path');
let dataPointMap = new Map();
let pollutantDayMeasure = [];
let measure = [];

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
        url: `https://analisi.transparenciacatalunya.cat/resource/tasf-thgu.json?$where=data >= '2022-01-01T00:00:00.000' &$limit=10000`,
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
            for(let i = 0; i < 25; ++i) {
                let searchHour = (i < 10) ? ("0" + i.toString()) : i.toString();
                let quant = (element["h"+searchHour] !== "" && element["h"+searchHour] !== undefined) ? element["h"+searchHour] : null;
                let m = {
                    _id: mongodb.ObjectId.createFromHexString(getNZero(24 - id.toString(16).length) + id.toString(16)),
                    hour: searchHour,
                    quantity: quant,
                    pollutantDayMeasure: pdm._id
                }
                measure.push(m);
                ++id;
            }
            dataPointMap.set(element.codi_eoi, dpm);
            pollutantDayMeasure.push(pdm);
        } else {
            let pdm = {
                _id: mongodb.ObjectId.createFromHexString(getNZero(24 - id.toString(16).length) + id.toString(16)),
                date: element.data,
                dataPointMap: dataPointMap.get(element.codi_eoi)._id,
                pollutant: element.contaminant,
                units: element.unitats
            }
            ++id;
            for(let i = 0; i < 25; ++i) {
                let searchHour = (i < 10) ? ("0" + i.toString()) : i.toString();
                let quant = (element["h"+searchHour] !== "" && element["h"+searchHour] !== undefined) ? element["h"+searchHour] : null;
                let m = {
                    _id: mongodb.ObjectId.createFromHexString(getNZero(24 - id.toString(16).length) + id.toString(16)),
                    hour: searchHour,
                    quantity: quant,
                    pollutantDayMeasure: pdm._id
                }
                measure.push(m);
                ++id;
            }
            pollutantDayMeasure.push(pdm);
        }
    });
    insert();
}


async function insert () {
    let insertions = [];
    for (let [, value] of dataPointMap) {
        insertions.push(value);
    }
    await axios({
        method: 'post',
        url: "http://localhost:2000/v1/insertMultipleDataPointMap",
        data: insertions,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
            "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            "authorization": "PES2022"
        }
      })
      .then(response => {
        console.log("It Worked!");
      })
      .catch(err => {
          console.log("Error: ", err);
      });

    /* await axios.post('http://localhost:2000/v1/insertMultipleDataPointMap', {
    data: { insertions }
    }, {
        headers: {
            "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            "authorization": "pes2022"
        },
        
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
 */
    //insertions = pollutantDayMeasure;
    /* for (let value of pollutantDayMeasure) {
        insertions.push(value);
        if (insertions.length > 50000) {
            await axios.post('http://localhost:2000/v1/insertMultiplePollutantDayMeasure', {
            params: { insertions }
            }, {
                headers: {
                    "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
                    "authorization": "pes2022"
                }
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
            insertions = [];
        }
    } 
    insertions = [];
    for (let value of pollutantDayMeasure) {
        insertions.push(value);
        if (insertions.length > 10000) {
            await axios({
                method: 'post',
                url: "http://localhost:2000/v1/insertMultiplePollutantDayMeasure",
                data: /* pollutantDayMeasure insertions,
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                headers: {
                    "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
                    "authorization": "PES2022"
                }
              })
              .then(response => {
                  "It Worked!";
              })
              .catch(err => {
                  console.log("Error: ", err);
              });  
              insertions = [];      
        }
    }
    await axios({
        method: 'post',
        url: "http://localhost:2000/v1/insertMultiplePollutantDayMeasure",
        data: /* pollutantDayMeasure insertions,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
            "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            "authorization": "PES2022"
        }
      })
      .then(response => {
        console.log("It Worked!");
      })
      .catch(err => {
          console.log("Error: ", err);
      });

    
    /* await axios.post('http://localhost:2000/v1/insertMultiplePollutantDayMeasure', {
    data: { pollutantDayMeasure }
    }, {
        headers: {
            "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            "authorization": "pes2022"
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    }); */

    /* insertions = measure;
    for (let value of measure) {
        insertions = insertions.concat(value);
        if (insertions.length > 50000) {
            await axios.post('http://localhost:2000/v1/insertMultipleMeasures', {
                params: { insertions }
            }, {
                headers: {
                    "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
                    "authorization": "pes2022"
                }
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
            insertions = [];
        }
    }

    insertions = [];
    for (let value of measure) {
        insertions.push(value);
        if (insertions.length > 10000) {
            await axios({
                method: 'post',
                url: "http://localhost:2000/v1/insertMultipleMeasures",
                data: insertions,
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                headers: {
                    "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
                    "authorization": "PES2022"
                }
              })
              .then(response => {
                  "It Worked!";
              })
              .catch(err => {
                  console.log("Error: ", err);
              });
              insertions = [];
        }
    }
    await axios({
        method: 'post',
        url: "http://localhost:2000/v1/insertMultipleMeasures",
        data: insertions,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
            "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            "authorization": "PES2022"
        }
      })
      .then(response => {
          console.log("It Worked!");
      })
      .catch(err => {
          console.log("Error: ", err);
      });

    

    /* await axios.post('http://localhost:2000/v1/insertMultipleMeasures', {
    data: { measure }
    }, {
        headers: {
            "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            "authorization": "pes2022"
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}

insertData();
 */