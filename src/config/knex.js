require("dotenv").config();

var options = {
  client: 'pg',
  pool: { min: 0, max: 5 }
}

if (process.env.ONLINE === "ON") {
  options.connection = process.env.ELE_URL;
  options.ssl = true
} else {
  options.connection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
}

const knex = require('knex')(options);

module.exports = knex;

