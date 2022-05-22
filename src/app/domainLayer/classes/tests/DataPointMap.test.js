import DataPointMap from '../DataPointMap';
import MeasureStation from '../MeasureStation';

let dataPointMapTest = new DataPointMap(42.203941, 2.251297);
/*
test('get hour level test',
    async () => {
        const data = await dataPointMapTest.getHourLevel(new Date('March 19, 2022 9:00:00'), 9);
        expect(data).toEqual(2);

    });
*/
test('test nearer points', async ()=>{
    const points= await dataPointMapTest.nearerPoints(new Date('March 19, 2022 9:00:00'));
    // console.log(points[0]);
    expect(points[0][0]).toBe(5914075.164821431);
});
