# reverse-geocode-csv-pkg

### Usage

##### Setup:
`npm i reverse-geocode-csv`  

create (or modify) a `.env` file to include `GOOGLE_KEY=<your_google_api_key>`

##### Implement:
```
const reverseGeocodeCsv = require('reverse-geocode-csv');
const fs = require('fs');
const csv = fs.readFileSync('./path/to/csv/file.csv'); // or however else you want to read in a csv

reverseGeocode(csv, <options>).then(outputCsv => do.things.with(csv)); // like write it somewhere with fs
```

### Options
| key | type | desc | default |
| ---- | ---- | ------- | ----- |
| `latIdx` | `Integer` | index of latitude column for input csv | 0 |
| `lonIdx` | `Integer` | index of longitude column for input csv | 1 |
| `columnNames` | `String[]` | column names for output csv | all valid column names |

Ex: `{ columnNames: ['state', 'city', 'zipcode'], latIdx: 41, lonIdx: 42 }`

### Notes

Valid column names are:  
  * formattedAddress
  * latitude
  * longitude
  * county
  * state
  * streetNumber
  * streetName
  * city
  * country
  * countryCode
  * zipcode
  * provider

the module expects the input csv to have a 'heading' row, _e.g.,_  

```
Latz,Lawns   <-- heading row
32.3182314,-86.902298
34.2675937,-86.2088669
....
```


