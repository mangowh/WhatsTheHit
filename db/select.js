const debug = require("debug")("whatsthehit:api/select")
const knex = require("./index.js");

module.exports = (req, res, next) => {

  knex.from(req.body["from"])
    .where(req.body.where)
    .select("*")
    .then((rows) => res.send(rows))
    .catch((err) => debug(err.stack));
};