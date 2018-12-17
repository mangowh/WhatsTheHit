const debug = require("debug")("whatsthehit:api")
const express = require("express");
const router = express.Router();
const auth = require("../config/auth")

router.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

router.use(auth)

router.post("/select", require("../db/select"));

router.post("/create", require("../db/create"))

router.post("/drop", require("../db/drop"));

router.post("/insert", require("../db/insert"));

router.post("/delete", require("../db/delete"));

module.exports = router;