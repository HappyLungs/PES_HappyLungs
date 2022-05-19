import DataPointMap from '../DataPointMap';
import MeasureStation from '../MeasureStation';

let dataPointMapTest = new DataPointMap(40.541006,0.680310);

test('get hour level test',
    async () => {
        const data = await dataPointMapTest.getHourLevel(new Date('March 19, 2022 9:00:00'), 9);
        expect(data).toEqual(2);

    });
/*
test('test nearer points', async ()=>{
    const points= await dataPointMapTest.nearerPoints(new Date('March 19, 2022 9:00:00'));
    expect(points[0][0]).toBe(5914075.164821431);
});*/
