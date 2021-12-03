import * as _ from "lodash";
const bodyParser = require('body-parser')
const app = require('express')()
const fetch = require('node-fetch')
require('dotenv').config()

const getSheet = async () => {
  const sheetUrl =
    "https://sheets.googleapis.com/v4/spreadsheets/" +
    process.env.NUXT_ENV_SHEET_ID +
    "/values/" +
    process.env.NUXT_ENV_TAB_NAME +
    "?alt=json&key=" +
    process.env.NUXT_ENV_GDRIVE_API_KEY;
    const response = await fetch(sheetUrl);
    return response.json();  
};

app.use(bodyParser.json())
app.get('/resources', async (req, res) => {
  const totalFeeds = 1;
  const resources = [];
  for (let tab = 1; tab <= totalFeeds; tab++) {
    const json = await getSheet(tab);
    console.log(json);
    const rows = json.values;

    // columns will be first row of data, rows will have removed first row
    const columns = rows.shift();

    for (const row of rows) {
      const formattedRow = {};

      for (let i = 0; i < columns.length; i++) {
        const column = _.camelCase(columns[i]);
        formattedRow[column] = row[i];
      }

      resources.push(formattedRow);
    }
  }
  res.json({ data: resources })
})

module.exports = app