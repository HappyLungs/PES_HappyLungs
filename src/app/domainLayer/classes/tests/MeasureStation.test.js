const MeasureStation = require("../MeasureStation");
const DadesObertes = require("../../services/DadesObertes");
const dadesObertes = new DadesObertes();
const measureStationTest = new MeasureStation("08102005");

test('test calc hour level', async()=>{
    let measures = await dadesObertes.getMeasuresDay(this.eoiCode,new Date('March 10, 2022 9:00:00'));
    const data= measureStationTest.calcHourQuantity(measures, 9);
    expect(data).toBe(1);
});

test('test getPollutantQuantityByHour', () => {
    expect(measureStationTest.getPollutantQuantityByHour([],12)).toBe(3);
});

test('test getMeasuresByDay(', async () => {
    const data = await measureStationTest.getMeasuresByDay(new Date('March 10, 2022 9:00:00'));
    expect(data).toBeInstanceOf(Map);
});
test('test get pollution level at every hour of a day', async()=>{
    const data =await measureStationTest.getDayLevel(new Date('March 10, 2022 9:00:00'));
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(24);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(24);
    expect(data).toHaveProperty('title');
});
test('test get pollution level at every day of a week', async()=>{
    const data =await measureStationTest.getWeekLevel(new Date('March 10, 2022 9:00:00'));
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(7);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(7);
    expect(data).toHaveProperty('title');
});
test('test get pollution level at every day of a month', async()=>{
    const data =await measureStationTest.getMonthLevel(new Date('March 10, 2022 9:00:00'));
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(30);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(30);
    expect(data).toHaveProperty('title');
});
test('test get pollution level at every month of a year', async()=>{
    const data =await measureStationTest.getYearLevel(new Date('March 10, 2022 9:00:00'));
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(11);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(11);
    expect(data).toHaveProperty('title');
});
/*test('test get pollutant by hour',()=>{
    const data=measureStationTest.getPollutantQuantityByHour()
});*/
test('test quantity of each pollutant at date', async ()=>{
    const data=await measureStationTest.getQuantityOfEachPollutantAtDay(new Date('April 10, 2022 9:00:00'));
    expect(data).toHaveLength(9);
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('quantity');
});

test('test distance', ()=>{
    let dist=measureStationTest.distance(41.475384, 1.9212021);
    expect(dist).toBe(0);
    dist=measureStationTest.distance(42.443584, 2.23889);
    expect(dist).toBeCloseTo( 110.81706691033331);
});