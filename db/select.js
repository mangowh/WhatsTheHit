const debug = require("debug")("whatsthehit:query/select")
const pool = require("./index.js");

// da mettere nel db/index.js

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

module.exports = (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      debug(err.stack);
    }

    knex.from(req.body["tabella"]).select("*")
      .where({ "id": req.body["id"] })
      .then((rows) => res.send(rows))
      .catch((err) => debug(err.stack))
      .finally(() => knex.destroy());
  })
};