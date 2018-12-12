var express = require("express");
var router = express.Router();
var debug = require("debug")("whatsthehit:api")
const auth = require("../config/auth")

router.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

router.use(auth)

router.post("/select", require("../db/select.js"));

router.post("/create",require("../db/create.js"))

router.post("/drop", require("../db/drop.js"));

router.post("/insert", require("../db/insert.js"));

router.post("/delete", require("../db/delete.js"));

//(router.post("/insertcsv", require("..db/insertcsv.js"))


module.exports = router;