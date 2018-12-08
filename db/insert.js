var debug = require("debug")("whatsthehit:api/insert")
var knex = require("./index.js");

module.exports = (req, res, next) => {
  knex.from(req.body.from)
    .insert(req.body.rows)
    .then(() => res.render("ok"))
    .catch((err) => debug(err.stack))
}