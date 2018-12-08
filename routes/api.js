var express = require("express");
var router = express.Router();
var debug = require("debug")("whatsthehit:api")

router.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});



router.post("/select", require("../db/select.js"));

router.post("/insert", require("../db/insert.js"));

router.post("/delete", require("../db/delete.js"));

module.exports = router;