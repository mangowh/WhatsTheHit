var debug = require("debug")("whatsthehit:api/insert")
var knex = require("./index.js");

module.exports = (req, res, next) => {

  var dati = req.body;
  delete dati.tabella;
  debug(dati);

  knex.from(req.body["tabella"])
    .insert(dati)
    .then(res.send("OK"))
    .catch((err) => debug(err.stack))
}