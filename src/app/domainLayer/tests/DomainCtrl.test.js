const DomainCtrl = require("../DomainCtrl");
const MeasureStation = require("../classes/MeasureStation");

let ctrld = new DomainCtrl();

jest.setTimeout(100000);
/*
test('test get map data', async ()=> {
    const mapdata = await ctrld.getMapData();
    expect(mapdata[0]).toHaveProperty('longitude');
    expect(mapdata[0]).toHaveProperty('latitude');
    expect(mapdata[0]).toHaveProperty('weight');
    expect(mapdata).toHaveLength(74);
});*/

test("test get heat points", async () => {
	const datapoints = await ctrld.getHeatPoints(9, {
		center: {
			latitude: 41.67164,
			longitude: 1.62246,
		},
	});
	//console.log(MeasureStation.Stations);
	//console.log(datapoints);
	//console.log(datapoints.length);
});
/*
test('test in Cat', async() => {
    let bool = await ctrld.inCat(41.804210, 1.372078);
    expect(bool).toBe(true);
    bool = await ctrld.inCat(41.853544, -0.532039);
    expect(bool).toBe(false);
});

test('test get pollution level last day', async ()=>{
    const data=await ctrld.getPollutionLevelLastDay(40.93944,0.83139044);
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(24);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(24);
    expect(data).toHaveProperty('title');
});
test('test get pollution level last week', async ()=>{
    const data=await ctrld.getPollutionLevelLastWeek(40.93944,0.83139044);
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(7);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(7);
    expect(data).toHaveProperty('title');
});
test('test get pollution level last month', async ()=>{
    const data=await ctrld.getPollutionLevelLastMonth(40.93944,0.83139044);
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(31);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(30);
    expect(data).toHaveProperty('title');
});
test('test get pollution level last year', async ()=>{
    const data=await ctrld.getPollutionLevelLastYear(40.93944,0.83139044);
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(12);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(12);
    expect(data).toHaveProperty('title');
});
test('get quantity of pollutants in a day',
    async () => {
        const data = await ctrld.getPollutantsQuantLastDay(40.93944, 0.83139044);
        expect(data[0]).toHaveProperty('name');
        expect(data[0]).toHaveProperty('quantity');
        expect(data).toHaveLength(3);
});*/
