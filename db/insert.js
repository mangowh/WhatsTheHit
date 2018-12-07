var squel = require("squel");
var debug = require("debug")("whatsthehit:query/select")
var pool = require("./index.js");

module.exports = (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      debug(err.stack)
    }

    var query = squel.insert()
      .into(req.body["tabella"])
      .set("id", req.body["id"])
      .set("nome", req.body["nome"]);

    //switch di casi della tabella???

    client.query(query.toString(), (err, result) => {
      release();
      if (err) {
        debug(err.stack);
        res.render("error");
      } else {
        res.send(result);
      }
    });
  })
}