import DataPointMap from '../DataPointMap';

let dataPointMapTest = new DataPointMap(40.93944,0.83139044);

test('get hour level test',
    async () => {
        const data = dataPointMapTest.getHourLevel(new Date('March 19, 2022 9:00:00'), 9);
        expect(data).toEqual({});
    });
