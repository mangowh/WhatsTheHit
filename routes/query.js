var express = require("express");
var router = express.Router();
var squel = require("squel");
var debug = require("debug")("whatsthehit:query")
var util = require("util")

var pool = require("../db/index.js");

router.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

function genSQL(body) {
  switch (body["tabella"]) {
    case ("artista"): {
      return squel.insert()
        .into("artista")
        .set("id", body["id"])
        .set("nome", body["nome"])
        .toString();

      break;
    }
  }
}

router.get("/select", (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      debug(err.stack);
    }

    var query = squel.select()
      .from("artista")
      .toString();

    client.query(query, (err, result) => {
      release();
      if (err) {
        debug(err.stack);
      } else {
        res.send(JSON.stringify(result.rows));
      }
    })
  })
});

router.post("/insert", (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      debug(err.stack)
    }

    var query = genSQL(req.body)

    client.query(query, (err, result) => {
      release();
      if (err) {
        debug(err.stack);
        res.render("error");
      } else {
        res.send("OK");
      }
    });
  })
});

router.post("/delete", (req, res, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      debug(err.stack)
    }

    var query = squel.delete()
      .from(req.body["tabella"])
      .where("id = ?", req.body["id"])
      .where("nome = ?", req.body["nome"])
      .toString();

    client.query(query, (err, result) => {
      release();
      if (err) {
        debug(err.stack);
        res.render("error");
      } else {
        res.send("OK");
      }
    });
  })
});

module.exports = router;