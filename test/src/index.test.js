const test = require('tape');
const path = require('path');
const reverseGeocodeCsv = require('../../src/index.js');
const fs = require('fs');

const inputCsv = fs.readFileSync(path.resolve(__dirname, '..', 'files', 'input.csv'))

const outputCsv = `city,state
Albertville,AL
Alfred,ME
Oneonta,AL
`;

test('reverserGeocodeCsv', t => {
  t.plan(1);
  reverseGeocodeCsv(inputCsv, { columnNames: ['city', 'state'] }).then(res => {
    t.equal(res, outputCsv)
  })
});
