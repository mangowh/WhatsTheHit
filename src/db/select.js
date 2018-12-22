const debug = require("debug")("whatsthehit:api/select"),
  createError = require('http-errors'),
  knex = require("../config/knex.js")

module.exports = (req, res, next) => {
  debug(req.body)

  knex.from(req.body.from)
    .where(req.body.where)
    .select("*")
    .then((rows) => res.send(rows))
    .catch((err) => {
      debug(err)
      next(createError(err.status))
    });
};