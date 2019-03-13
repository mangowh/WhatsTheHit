const debug = require("debug")("whatsthehit:api"),
  express = require("express"),
  router = express.Router(),
  auth = require("../config/auth")

router.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});

// Query al database

/**
 * @api {post} /select Richiedere informazioni dal database SQL
 * @apiName Select dal database
 * @apiGroup Query
 * 
 * @apiSuccessExample {json} Esempio di body richiesta:
 * 
 *{	
 *"from" : ["artista","canzone"],
 *"where": {
 *"anno": 1978
 *},
 *"orderby": " punteggio",
 *"desc": true,
 *"limit": 3
 *}
 *
 * @apiSuccessExample {json} Esempio di risposta:
 *HTTP/1.1 200 OK
 *[
 * {
 *   "id": "ec8afbbe-ea60-11e8-bdc4-5404a6f1883d",
 *   "nome": "Bee Gees",
 *   "artista_id": "4100491a-ea60-11e8-a624-5404a6f1883d",
 *   "canzone_id": "ec8afbbe-ea60-11e8-bdc4-5404a6f1883d",
 *   "titolo": "Stayin' Alive",
 *   "anno": "1978",
 *   "punteggio": "29.728"
 * },
 * {
 *   "id": "ed47d000-ea60-11e8-9eb6-5404a6f1883d",
 *   "nome": "John Travolta & Olivia Newton-John",
 *   "artista_id": "41be8f96-ea60-11e8-a0d2-5404a6f1883d",
 *   "canzone_id": "ed47d000-ea60-11e8-9eb6-5404a6f1883d",
 *   "titolo": "You're the One That I Want",
 *   "anno": "1978",
 *   "punteggio": "26.790"
 * },
 * {
 *   "id": "ee1de901-ea60-11e8-b645-5404a6f1883d",
 *   "nome": "The Village People",
 *   "artista_id": "4294472e-ea60-11e8-b8de-5404a6f1883d",
 *   "canzone_id": "ee1de901-ea60-11e8-b645-5404a6f1883d",
 *   "titolo": "YMCA",
 *   "anno": "1978",
 *   "punteggio": "25.951"
 * }
 *]
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