const debug = require("debug")("whatsthehit:api/select")
const knex = require("./index.js");

module.exports = (req, res, next) => {

  var dati = req.body;
  delete dati.tabella;
  debug(dati);

  knex.from(req.body["tabella"]).select("*")
    .where(dati)
    .then((rows) => res.send(rows))
    .catch((err) => debug(err.stack));
};