const debug = require("debug")("whatsthehit:api/select")
const knex = require("./index.js");

module.exports = (req, res, next) => {
  knex.from(req.body["tabella"]).select("*")
    .where({ "id": req.body["id"] })
    .then((rows) => res.send(rows))
    .catch((err) => debug(err.stack));
};