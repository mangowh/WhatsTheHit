const debug = require("debug")("whatsthehit:api"),
  express = require("express"),
  router = express.Router(),
  auth = require("../config/auth")

router.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

//Query al database
/**
 * @api {post} /select Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.post("/select", require("../db/select"));

//Richieste a wikidata
router.get("/lang", require("../wiki/lang"))
router.get("/genre", require("../wiki/genre"))
router.get("/img", require("../wiki/img"))

//Route protette
router.use(auth)
router.post("/create", require("../db/create"))
router.post("/drop", require("../db/drop"));
router.post("/insert", require("../db/insert"));
router.post("/delete", require("../db/delete"));

module.exports = router;