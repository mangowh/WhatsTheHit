var options;

if (process.env.ONLINE === "ON") {
  options = {
    client: 'pg',
    connection: "postgres://ktgkvfde:sWIz7ip0tNOcU1dMSXCwGbrmED7CzAv6@manny.db.elephantsql.com:5432/ktgkvfde",
    ssl: true
  }
} else {
  options = {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    }
  }
}

const knex = require('knex')(options);

module.exports = knex;

