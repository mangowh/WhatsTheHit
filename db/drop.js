const debug = require("debug")("whatsthehit:api/create")
const createError = require('http-errors');
const knex = require("./index.js");

module.exports = (req, res, next) => {
  debug(req.body)

  knex.schema.dropTable(req.body.nome)
    .then(() => {
      res.render("OK");
    })
    .catch((err) => {
      debug(err)
      next(createError(err.status))
    });
};