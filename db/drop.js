const debug = require("debug")("whatsthehit:api/create")
const knex = require("./index.js");

module.exports = (req, res, next) => {
  debug(req.body)

  knex.schema.dropTable(req.body.nome)
    .then(() => {
      res.render("OK");
    })
    .catch((err) => {
      res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; //solo se in sviluppo mostra errore
      res.render("error");
    });
};