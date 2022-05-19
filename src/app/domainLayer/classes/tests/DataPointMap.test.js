import DataPointMap from '../DataPointMap';

let dataPointMapTest = new DataPointMap(40.541006,0.680310);

test('get hour level test',
    async () => {
        const data = await dataPointMapTest.getHourLevel(new Date('March 19, 2022 9:00:00'), 9);
        expect(data).toEqual(0);
    });

test('test nearer points', ()=>{
    const points=dataPointMapTest.nearerPoints(new Date('March 19, 2022 9:00:00'));
    expect(points).toBe({});
});
