const debug = require('debug')('whatsthehit:auth');

module.exports = (req, res, next) => {
  if (req.header("password") === "password") {
    next();
  } else {
    res.send("QUERY PROTETTA");
  }
}