// load model
const responseObj = {};
const mongodb = require("mongodb");
const errorCodes = require("../helpers/errorCodes.js");

const dataPointMap = require("./../datalayers/dataPointMap.datalayer");

exports.find = async (request, response) => {
    let params = {};
    if (request.query.hasOwnProperty("eoiCode") && request.query.hasOwnProperty("date")) {
        params = request.query;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }

    let date = new Date(params.date);

    let match = {
        eoiCode: Number(params.eoiCode)
    }

    let aggregateArr = createAggregateArray(match, date);
    console.log(JSON.stringify(aggregateArr));
    dataPointMap
    .aggregateDataPointMap(aggregateArr)
    .then((dataPointMapData) => {
        response.send(dataPointMapData);
    })
    .catch((err) => {
        response.send(err);
    });
    return;
    
    /*if (mongodb.ObjectId.isValid(mongodb.ObjectId(id))) {
        const where = {};
        where._id = mongodb.ObjectId(id);
        dataPointMap.findDataPointMap(where)
        .then((dataPointMapData) => {
            if (dataPointMapData !== null && typeof dataPointMapData !== undefined) {
                responseObj.status  = errorCodes.SUCCESS;
                responseObj.message = "Success";
                responseObj.data    = dataPointMapData;
            } else {
                responseObj.status  = errorCodes.DATA_NOT_FOUND;
                responseObj.message = "No record found";
                responseObj.data    = {};
            }
            response.send(responseObj);
        })
        .catch(error => {
            responseObj.status  = errorCodes.SYNTAX_ERROR;
            responseObj.message = error;
            responseObj.data    = {};
            response.send(responseObj);
        });
    } else {
        responseObj.status  = errorCodes.SYNTAX_ERROR;
        responseObj.message = "Invalid id";
        responseObj.data    = {};
        response.send(responseObj);
    }
    return; */
};

exports.create = async (request, response, next) => {
    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
    dataPointMap.createDataPointMap(params)
    .then((dataPointMapData) => {
        console.log(dataPointMapData);
        if (dataPointMapData !== null && typeof dataPointMapData !== undefined) {
            responseObj.status  = errorCodes.SUCCESS;
            responseObj.message = "Success";
            responseObj.data    = dataPointMapData;
        } else {
            responseObj.status  = errorCodes.DATA_NOT_FOUND;
            responseObj.message = "No record found";
            responseObj.data    = {};
        }
        response.send(responseObj);
    })
    .catch(error => {
        responseObj.status  = errorCodes.SYNTAX_ERROR;
        responseObj.message = error;
        responseObj.data    = {};
        response.send(responseObj);
    });
    return;
};

exports.insertMultiple = async (request, response) => {
    let params = {};
    if (request.body.params) {
        params = request.body.params;
    } else {
        responseObj.status  = errorCodes.REQUIRED_PARAMETER_MISSING;
        responseObj.message = "Required parameters missing";
        responseObj.data    = {};
        response.send(responseObj);
        return;
    }
    dataPointMap.insertMany(params.insertions)
    .then((dataPointMapData) => {
        console.log(dataPointMapData);
        if (dataPointMapData !== null && typeof dataPointMapData !== undefined) {
            responseObj.status  = errorCodes.SUCCESS;
            responseObj.message = "Success";
            responseObj.data    = dataPointMapData;
        } else {
            responseObj.status  = errorCodes.DATA_NOT_FOUND;
            responseObj.message = "No record found";
            responseObj.data    = {};
        }
        response.send(responseObj);
    })
    .catch(error => {
        responseObj.status  = errorCodes.SYNTAX_ERROR;
        responseObj.message = error;
        responseObj.data    = {};
        response.send(responseObj);
    });
    return;
}

function createAggregateArray (match, date) {
    return [
        {
          '$match': match
        }, {
          '$lookup': {
            'from': 'pollutantdaymeasures', 
            'let': {
              'data': date, 
              'id': '$_id'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$and': [
                      {
                        '$eq': [
                          '$dataPointMap', '$$id'
                        ]
                      }, {
                        '$eq': [
                          '$$data', '$date'
                        ]
                      }
                    ]
                  }
                }
              }, {
                '$lookup': {
                  'from': 'measures', 
                  'localField': '_id', 
                  'foreignField': 'pollutantDayMeasure', 
                  'as': 'measures'
                }
              }, {
                '$project': {
                  '_id': 0, 
                  'pollutant': 1, 
                  'units': 1, 
                  'date': 1, 
                  'measures': 1
                }
              }
            ], 
            'as': 'pollutantDayMeasure'
          }
        }
      ];
}