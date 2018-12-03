var express = require("express");
var router = express.Router();
var squel = require("squel");
var debug = require("debug")("whatsthehit:query")

var pool = require("../db/index.js");

router.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

router.get("/", (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      debug(err.stack)
    }
    client.query(squel.select().from("artista").toString(), (err, result) => {
      release()
      if (err) {
        debug(err.stack)
      }
      res.send(JSON.stringify(result.rows));
    })
  })
});

module.exports = router;