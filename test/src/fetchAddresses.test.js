require('dotenv').config();
const test = require('tape');
const fetchAddresses = require('../../src/fetchAddresses');
const sampleLatLon = [
  ['lat', 'lon'],
  [38.8977, 77.0365]
];

test('fetchAddresses', t => {
  t.plan(2);

  const promise = fetchAddresses({
    parsedCsvData: sampleLatLon,
    latIdx: 0,
    lonIdx: 1
  });
  t.equal(!!promise.then, true, 'fetchAddresses returns promise');

  promise.then(res => {
    const { formattedAddress } = res[0];
    const actual = formattedAddress;
    const expected = 'Yopurga, Kashgar, Xinjiang, China';
    t.equal(actual, expected, 'provides formatted address');
  });
});
