import DataPointMap from '../DataPointMap';
import MeasureStation from '../MeasureStation';
import ctrlDomini from '../../DomainCtrl';
let dataPointMapTest = new DataPointMap(41.361314, 2.106440);
let CtrlD=new ctrlDomini();
jest.setTimeout(1000000);
/*
test('get hour level test',
    async () => {
        const data = await dataPointMapTest.getHourLevel(new Date('March 19, 2022 9:00:00'), 9);
        expect(data).toEqual(2);

    });

test('test nearer points', async ()=>{
    const points= await dataPointMapTest.nearerPoints(new Date('March 19, 2022 9:00:00'));
    console.log(points[0]);
    expect(points[0][0]).toBe( 12416.648811842428);
});*/
test('test nearest point', async ()=>{

    await CtrlD.initMeasureStations();
    const point= await dataPointMapTest.nearestPoint();
    console.log(point);
});