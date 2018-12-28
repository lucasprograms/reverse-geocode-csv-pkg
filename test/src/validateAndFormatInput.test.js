const test = require('tape');
const validateAndFormatInput = require('../../src/validateAndFormatInput');
const validColumnNames = [
  'formattedAddress',
  'latitude',
  'longitude',
  'county',
  'state',
  'streetNumber',
  'streetName',
  'city',
  'country',
  'countryCode',
  'zipcode',
  'provider'
];

test('validateAndFormatInput: no parameters provided', t => {
  t.plan(3);

  const { latIdx, lonIdx, columnNames } = validateAndFormatInput({});
  const expectedLatIdx = 0;
  const expectedLonIdx = 1;
  const expectedColumnNames = validColumnNames;

  t.equal(latIdx, expectedLatIdx);
  t.equal(lonIdx, expectedLonIdx);
  t.same(columnNames, expectedColumnNames);
});

test('validateAndFormatInput: all (valid) parameters provided', t => {
  t.plan(3);

  const { latIdx, lonIdx, columnNames } = validateAndFormatInput({ latIdx: 17, lonIdx: 42, columnNames: ['state', 'county'] });
  const expectedLatIdx = 17;
  const expectedLonIdx = 42;
  const expectedColumnNames = [
    'state',
    'county',
  ];

  t.equal(latIdx, expectedLatIdx);
  t.equal(lonIdx, expectedLonIdx);
  t.same(columnNames, expectedColumnNames);
});

test('validateAndFormatInput: invalid column name', t => {
  t.plan(1);

  const { error } = validateAndFormatInput({ columnNames: ['fleebus', 'knuckles'] });
  const expectedError = {
    title: `INVALID COLUMN NAME(S): fleebus, knuckles`,
    body: `\nValid column names are: \n${validColumnNames.join('\n')}`
  }

  t.deepEqual(error, expectedError);
});
