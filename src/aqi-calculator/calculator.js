const pollutantRange = {
    C6H6: [],
    Cl2:  [],
    CO:   [],
    H2S:  [],
    Hg:   [],
    NO:   [],
    NO2:  [],
    NOX:  [],
    O3:   [0, 60, 76, 96, 116, 374, 1000],
    PM1:  [],
    PM10: [],
    PM25: [0, 12, 35, 55, 150, 250, 350],
    SO2:  [0, 35, 145, 225, 305, 604, ],


    pm10: [0, 50, 100, 250, 350, 430, 1000],
    so2: [0, 40, 80, 380, 800, 1600, 2000],
    no: [0, 40, 80, 180, 280, 400, 1000],
    nox: [0, 40, 80, 180, 280, 400, 1000],
    no2: [0, 40, 80, 180, 280, 400, 1000],
    o3: [0, 50, 100, 168, 280, 400, 1000],
    co: [0, 1, 2, 10, 17, 34, 50],
    aqi: [0, 50, 100, 200, 300, 400, 500],
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