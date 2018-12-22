const debug = require("debug")("whatsthehit:api/insert"),
  createError = require('http-errors'),
  knex = require("../config/knex.js")

module.exports = (req, res, next) => {
  debug(req.body)
  var ajax = JSON.parse(req.body);
  knex.from(ajax.from)
    .insert(ajax.rows)
    .then(() => res.render("ok"))
    .catch((err) => {
      debug(err)
      next(createError(err.status))
    });
}