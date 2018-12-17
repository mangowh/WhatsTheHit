var debug = require("debug")("whatsthehit:api/delete")
const createError = require('http-errors');
var knex = require("./index.js");

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