const test = require('tape');
const formatGeoData = require('../../src/formatGeoData.js');

const columnNames = [
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
const geoData = [
  {
    formattedAddress: 'Yopurga, Kashgar, Xinjiang, China',
    latitude: 39.2242,
    longitude: 76.773163,
    extra: {
      googlePlaceId: 'ChIJaXM3V0dLjTgRACnwIjSW8og',
      confidence: 0.5,
      premise: null,
      subpremise: null,
      neighborhood: 'Yopurga',
      establishment: null
    },
    administrativeLevels: { level1long: 'Xinjiang', level1short: 'Xinjiang' },
    city: 'Kashgar',
    country: 'China',
    countryCode: 'CN',
    provider: 'google'
  },
  {
    formattedAddress: '45 State St, Gorham, ME 04038, USA',
    latitude: 43.6793267,
    longitude: -70.4442414,
    extra: {
      googlePlaceId: 'ChIJ75O-ujGRskwRjh-wklE-L2A',
      confidence: 1,
      premise: null,
      subpremise: null,
      neighborhood: 'Gorham',
      establishment: null
    },
    administrativeLevels: {
      level3long: 'Gorham',
      level3short: 'Gorham',
      level2long: 'Cumberland County',
      level2short: 'Cumberland County',
      level1long: 'Maine',
      level1short: 'ME'
    },
    streetNumber: '45',
    streetName: 'State Street',
    city: 'Gorham',
    country: 'United States',
    countryCode: 'US',
    zipcode: '04038',
    provider: 'google'
  }
];

test('formatGeoData', t => {
  t.plan(1);

  const expected = [
    [
      'Yopurga, Kashgar, Xinjiang, China',
      39.2242,
      76.773163,
      undefined,
      'Xinjiang',
      undefined,
      undefined,
      'Kashgar',
      'China',
      'CN',
      undefined,
      'google'
    ],
    [
      '45 State St, Gorham, ME 04038, USA',
      43.6793267,
      -70.4442414,
      'Cumberland County',
      'ME',
      '45',
      'State Street',
      'Gorham',
      'United States',
      'US',
      '04038',
      'google'
    ]
  ];
  const actual = formatGeoData({ geoData, columnNames });
  t.same(actual, expected);
});
