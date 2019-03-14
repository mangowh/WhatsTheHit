const debug = require("debug")("whatsthehit:api/create"),
  createError = require('http-errors'),
  knex = require("../config/knex.js")

module.exports = (req, res, next) => {
  debug(req.body)

  knex.schema.dropTable(req.body.nome)
    .then(() => {
      res.render("ok");
    })
    .catch((err) => {
      debug(err)
      next(createError(err.status))
    });
};