const debug = require("debug")("whatsthehit:api"),
  express = require("express"),
  router = express.Router(),
  auth = require("../config/auth")

router.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

// Query al database

router.post("/select", require("../db/select"));

//Richieste a wikidata
router.get("/lang", require("../wiki/lang"))
router.get("/genre", require("../wiki/genre"))
router.get("/img", require("../wiki/img"))

//Route protette
router.use(auth)
router.post("/insert", require("../db/insert"));
router.post("/delete", require("../db/delete"));

module.exports = router;