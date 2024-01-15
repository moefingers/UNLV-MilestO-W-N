import { checkValidTravelPath } from './checkValidTravelPath.js';
import { Location } from './location.js';

let testFailures = 0;

function test(testName, testFunction) {
    console.log(`Testing ${testName}...`);
    testFunction();
    if (testFailures > 0) {
        console.error(`${testFailures} tests failed!`);
    } else {
        console.log('All tests passed!');
    }
}

function expect(expectedResult, actualResult) {
    if (expectedResult === actualResult) {
        console.log('✅ Test passed.');
    } else {
        testFailures++;
        console.error(`❌ Test failed! Expected ${expectedResult}, but got ${actualResult}`);
    }
}

test('check for moving off of half block', () => {
    const map = [
        [1, 1],
        [1, 1],
    ];
    console.log('move down while halfway through x-axis of a block');
    const value = checkValidTravelPath(map, new Location(0.5, 0), 0, 0.5);
    expect(false, value);

    console.log('move up while halfway through x-axis of a block');
    const value2 = checkValidTravelPath(map, new Location(0.5, 1), 0, -0.5);
    expect(false, value2);

    console.log('move right while halfway through y-axis of a block');
    const value3 = checkValidTravelPath(map, new Location(0, 0.5), 0.5, 0);
    expect(false, value3);

    console.log('move left while halfway through y-axis of a block');
    const value4 = checkValidTravelPath(map, new Location(1, 0.5), -0.5, 0);
    expect(false, value4);

    console.log('move down while on an x-axis vertex');
    const value5 = checkValidTravelPath(map, new Location(0, 0), 0, 0.5);
    expect(true, value5);

    console.log('move up while on an x-axis vertex');
    const value6 = checkValidTravelPath(map, new Location(0, 1), 0, -0.5);
    expect(true, value6);

    console.log('move right while on a y-axis vertex');
    const value7 = checkValidTravelPath(map, new Location(0, 0), 0.5, 0);
    expect(true, value7);

    console.log('move left while on a y-axis vertex');
    const value8 = checkValidTravelPath(map, new Location(1, 0), -0.5, 0);
    expect(true, value8);
});

test('check for moving into empty space', () => {
    const map = [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ];
    console.log('move down into empty space');
    const value = checkValidTravelPath(map, new Location(0, 2), 0, 0.5);
    expect(false, value);

    console.log('move up into empty space');
    const value2 = checkValidTravelPath(map, new Location(2, 1), 0, -0.5);
    expect(false, value2);

    console.log('move right into empty space');
    const value3 = checkValidTravelPath(map, new Location(2, 1), 0.5, 0);
    expect(false, value3);

    console.log('move left into empty space');
    const value4 = checkValidTravelPath(map, new Location(1, 3), -0.5, 0);
    expect(false, value4);

    console.log('move right into an ');
});

test('check for edge cases discovered testing map 5', () => {
    const map = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 0],
    ];
    console.log('move right into edge sharing an empty space');
    const value = checkValidTravelPath(map, new Location(0, 1), 0.5, 0);
    expect(true, value);

    console.log('move right into an empty space');
    const value2 = checkValidTravelPath(map, new Location(1, 2), 0.5, 0);
    expect(false, value2);
});
