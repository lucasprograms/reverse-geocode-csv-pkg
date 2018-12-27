require('dotenv').config();

const parseCSV = require('csv-parse');
const generateCSV = require('csv-stringify');

const fetchAddresses = require('./fetchAddresses.js');
const validateAndFormatInput = require('./validateAndFormatInput.js');
const formatGeoData = require('./formatGeoData.js');

function reverseGeocodeCsv (csv, options) {
  const {
    columnNames,
    latIdx,
    lonIdx,
    error
  } = validateAndFormatInput(options);

  if (error) {
    throw new Error(`${error.title}: ${error.body}`)
  } else {
    return parseCSV(csv, {}, (__, parsedCsvOutput) => {
      fetchAddresses({ parsedCsvData: parsedCsvOutput, latIdx, lonIdx }).then(
        res => {
          const formattedGeoData = [
            columnNames,
            ...formatGeoData({ geoData: res.slice(1).flat(), columnNames })
          ];
          
          return generateCSV(formattedGeoData, (__, csv) => csv);
        }
      );
    });
  }
}

module.exports = reverseGeocodeCsv;