const debug = require("debug")("whatsthehit:api/create"),
  createError = require('http-errors'),
  knex = require("../config/knex.js")

module.exports = (req, res, next) => {
  debug(req.body)

  knex.schema.createTable(req.body.nome, table => {
    if (req.body.id)
      table.uuid("id").primary()

    /*for (var key in req.body.rows) {
      //if (req.body.rows.hasOwnProperty(key)) {
        debug(key + "->" + req.body.rows.key)
      //}
    }*/
  })
    .then(() => {
      res.render("OK");
    })
    .catch((err) => {
      debug(err)
      next(createError(err.status))
    });
};