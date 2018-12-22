const debug = require("debug")("whatsthehit:api/delete"),
  createError = require('http-errors'),
  knex = require("../config/knex.js")

module.exports = (req, res, next) => {
  knex.from(req.body.from)
    .where(req.body.where)
    .del()
    .then(() => res.render("ok"))
    .catch((err) => {
      debug(err)
      next(createError(err.status))
    });
}