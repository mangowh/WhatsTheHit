require("dotenv").config();
const debug = require('debug')('whatsthehit:auth');

module.exports = (req, res, next) => {
  if (req.header("password") === process.env.PASS) {
    next();
  } else {
    res.send("Errore: autorizzazione non sufficente");
  }
}