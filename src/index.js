require('dotenv').config();

const parseCSV = require('csv-parse');
const generateCSV = require('csv-stringify');

const fetchAddresses = require('./fetchAddresses.js');
const validateAndFormatInput = require('./validateAndFormatInput.js');
const formatGeoData = require('./formatGeoData.js');

function reverseGeocodeCsv(csv, options) {
  const { columnNames, latIdx, lonIdx, error } = validateAndFormatInput(
    options
  );

  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    }
    parseCSV(csv, {}, (err, parsedCsvOutput) => {
      if (err) {
        reject(err);
      }
      fetchAddresses({ parsedCsvData: parsedCsvOutput, latIdx, lonIdx }).then(
        res => {
          const formattedGeoData = [
            columnNames,
            ...formatGeoData({ geoData: res.flat(), columnNames })
          ];

          generateCSV(formattedGeoData, (__, csv) => resolve(csv));
        }
      );
    });
  });
}

module.exports = reverseGeocodeCsv;
