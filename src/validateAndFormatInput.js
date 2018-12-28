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

function validateAndFormatInput(options) {
  let { columnNames = validColumnNames, latIdx = 0, lonIdx = 1 } = options;

  const invalidColumns = columnNames.filter(
    columnName => !validColumnNames.includes(columnName)
  );

  if (invalidColumns.length) {
    return {
      error: {
        title: `INVALID COLUMN NAME(S): ${invalidColumns.join(', ')}`,
        body: `\nValid column names are: \n${validColumnNames.join('\n')}`
      }
    };
  }

  return { columnNames, latIdx, lonIdx };
}

module.exports = validateAndFormatInput;
