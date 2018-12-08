var debug = require("debug")("whatsthehit:api/delete")
var knex = require("./index.js");

module.exports = (req, res, next) => {

  var dati = req.body;
  delete dati.tabella;
  debug(dati);

  knex.from(req.body["tabella"])
    .where(dati)
    .del()
    .then(res.send("OK"))
    .catch((err) => debug(err.stack))
}