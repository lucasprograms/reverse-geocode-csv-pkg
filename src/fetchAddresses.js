const NodeGeocoder = require('node-geocoder');
const geocoderOptions = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_KEY
};

function fetchAddresses({ parsedCsvData, latIdx, lonIdx }) {
  return Promise.all(
    parsedCsvData.slice(1).map(
      (parsedCsvDatum) =>
        new Promise(resolve =>
          NodeGeocoder(geocoderOptions)
            .reverse({
              lat: parsedCsvDatum[latIdx],
              lon: parsedCsvDatum[lonIdx]
            })
            .then(res => resolve(res[0]))
        )
    )
  );
}

module.exports = fetchAddresses;
