'use strict';

require('dotenv').config({ path: '../' });
const request = require('request');

// Read Group ID and API token from environment variables
const BOT_ID = process.env.BOT_ID;
const FACT_URL = 'http://numbersapi.com/random/year';


module.exports = {
  list: () => {
    return new Promise((resolve, reject) => {
      formatFactForGM()
        .then((formattedFact) => {
          resolve(formattedFact);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

// format fact for GM calls get fact
const getFactFromAPI = () => {
  return new Promise((resolve, reject) => {
    request.get(FACT_URL, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
};

const formatFactForGM = () => {

  return new Promise((resolve, reject) => {
    getFactFromAPI()
      .then((fact) => {

        let finalResponseObject = {
          bot_id: BOT_ID,
          text: fact
        };
        resolve(JSON.stringify(finalResponseObject));
      })
      .catch((err) => {
        reject(err);
      });
  });
};
