const pollutantRange = {
    CO:   [0, 2, 4, 8, 30, 100, 1000],
    NO2:  [0, 25, 50, 100, 200, 400, 1000],
    O3:   [0, 33, 65, 120, 180, 240, 1000],
    PM10: [0, 12, 25, 50, 90, 180, 1000],
    PM25: [0, 7, 15, 30, 55, 110, 1000],
    SO2:  [0, 25, 50, 120, 350, 500, 1000],    
};

function pollutantRangeGet(element) {
    switch(element) {
        case 'pm25':
            return pollutantRange.pm25
        case 'aqi':
            return pollutantRange.aqi
    }
}

function range(element, num) {
    let ranges = pollutantRangeGet(element);
    for (var i=0; i<ranges.length-1; i++) {
        let lo = ranges[i]
        let hi = ranges[i+1]
        if (num >= lo && num < hi) return [lo, hi]
    }
}

function calculatePollutantAQI (pollutant, quantity) {
    //concentration breakpoint range
    let bp = range(pollutant, quantity)
    let bpLo = bp[0]
    let bpHi = bp[1]

    //AQI range
    let aqiLo = range('aqi', bpLo)[0]
    let aqiHi = range('aqi', bpHi)[1]

    let aqi = (((aqiHi-aqiLo)/(bpHi-bpLo))*(quantity-bpLo)+aqiLo)

    let result = {
        bpLo: bpLo,
        bpHi: bpHi,
        aqiLo: aqiLo,
        aqiHi: aqiHi,
        aqi: aqi
    }

    return aqi
}

function calculateAQI (pollutants) {
    if (pollutants.size == 0) return null;

    let subAQIs = []
    for(const [pollutant, quantity] of pollutants){
        subAQIs.push(calculatePollutantAQI(pollutant, quantity))
    }

    return Math.max(...subAQIs)
}

pollutants = new Map()
myMap.set('pm25', 'one')
console.log(calculateSubindex('pm25', 6))