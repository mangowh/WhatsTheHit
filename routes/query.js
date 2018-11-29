require("dotenv").config();

var express = require('express');
var router = express.Router();

var { Client } = require("pg");

var client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

//Non usare funzione sincrona
client.connect(); //XXX
//#############

router.get("/",(req, res, next) => {
  res.header("Content-Type", "application/json");
  client.query("SELECT * FROM artista limit 10")
    .then(query => res.send(JSON.stringify(query.rows)));
});

module.exports = router;