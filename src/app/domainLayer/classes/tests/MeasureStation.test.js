const MeasureStation = require("../MeasureStation");

let measureStationTest = new MeasureStation("08019043");

test('test getPollutantQuantityByHour', () => {
    expect(measureStationTest.getPollutantQuantityByHour([],12)).toBe(3);
});
test('test getMeasuresByDay(', async () => {
    const data = await measureStationTest.getMeasuresByDay("2022-03-15T00:00:00.000");
    expect(data).toBe(5);
});