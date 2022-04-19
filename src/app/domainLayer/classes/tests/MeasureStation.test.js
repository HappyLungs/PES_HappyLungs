const MeasureStation = require("../MeasureStation");
const DadesObertes = require("../../services/DadesObertes");
const dadesObertes = new DadesObertes();
const measureStationTest = new MeasureStation("08015001", "Franciaa", "urbana" , 41.443584, 2.23889, null );

test('test calc hour level', async()=>{
    let measures = await dadesObertes.getMeasuresDay(this.eoiCode,new Date('March 19, 2022 9:00:00'));
    const data= measureStationTest.calcHourQuantity(measures, 9);
    expect(data).toBe(1);
});

test('test getPollutantQuantityByHour', () => {
    expect(measureStationTest.getPollutantQuantityByHour([],12)).toBe(3);
});

test('test getMeasuresByDay(', async () => {
    const data = await measureStationTest.getMeasuresByDay(new Date('March 19, 2022 9:00:00'));
    expect(data).toBeInstanceOf(Map);
    expect(data).toHaveLength(24);
});
test('test get pollution level at every hour of a day', async()=>{
    const data =measureStationTest.getDayLevel(new Date('March 19, 2022 9:00:00'));
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(24);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(24);
    expect(data).toHaveProperty('title');
});
test('test get pollution level at every day of a week', async()=>{
    const data =measureStationTest.getWeekLevel(new Date('March 19, 2022 9:00:00'));
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(7);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(7);
    expect(data).toHaveProperty('title');
});
test('test get pollution level at every day of a month', async()=>{
    const data =measureStationTest.getMonthLevel(new Date('March 19, 2022 9:00:00'));
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(31);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(31);
    expect(data).toHaveProperty('title');
});
test('test get pollution level at every month of a year', async()=>{
    const data =measureStationTest.getYearLevel(new Date('March 19, 2022 9:00:00'));
    expect(data).toHaveProperty('levels');
    expect(data.levels).toHaveLength(12);
    expect(data).toHaveProperty('tags');
    expect(data.tags).toHaveLength(12);
    expect(data).toHaveProperty('title');
});
/*test('test get pollutant by hour',()=>{
    const data=measureStationTest.getPollutantQuantityByHour()
});*/
test('test quantity of each pollutant at date', async ()=>{
    const data=await measureStationTest.getQuantityOfEachPollutantAtDay(new Date('April 19, 2022 9:00:00'));
    expect(data).toHaveLength(3);
    expect(data[0]).toHaveProperty('name');
    expect(data[0]).toHaveProperty('quantity');
});

test('test distance', ()=>{
    let dist=measureStationTest.distance(41.443584, 2.23889);
    expect(dist).toBe(0);
    dist=measureStationTest.distance(42.443584, 2.23889);
    expect(dist).toStrictEqual( 111.19492664455873);
});