var debug = require("debug")("whatsthehit:query/select")
var knex = require("./index.js");

module.exports = (req, res, next) => {

  var dati = req.body;
  delete dati.tabella;
  debug(dati);

  knex.from(req.body["tabella"])
    .insert({ id: req.body["id"], nome: req.body["nome"] })
    .then(() => res.send("OK"))
    .catch((err) => { debug(err.stack)});
}