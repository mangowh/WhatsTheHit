var squel = require("squel");
var debug = require("debug")("whatsthehit:query/select")
var pool = require("./index.js");

module.exports = (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      debug(err.stack);
    }

    var query = squel.select().from(req.body["tabella"]);

    if(req.body["condizione"]) {
      query.where(req.body["condizione"]);  //possibile sql injection ???
    }

    client.query(query.toString(), (err, result) => {
      release();
      if (err) {
        debug(err.stack);
      } else {
        res.send(JSON.stringify(result.rows));
      }
    })
  })
}