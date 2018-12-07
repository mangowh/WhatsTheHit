/*var { Pool } = require("pg");

var pool;

if (process.env.ONLINE === "ON") {
  pool = new Pool({
    connectionString: "postgres://ktgkvfde:sWIz7ip0tNOcU1dMSXCwGbrmED7CzAv6@manny.db.elephantsql.com:5432/ktgkvfde"
  });
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
  });
}

module.exports = pool;

*/

const options = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
}

const knex = require('knex')(options);

module.exports = knex;

