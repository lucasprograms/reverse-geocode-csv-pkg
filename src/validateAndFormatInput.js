function validateAndFormatInput({ columnNames, latIdx, lonIdx }) {
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

  latIdx = latIdx || 0;
  lonIdx = !lonIdx && lonIdx !== 0 ? 1 : lonIdx;
  columnNames = columnNames.length ? columnNames : validColumnNames;

  return { columnNames, latIdx, lonIdx };
}

module.exports = validateAndFormatInput;
