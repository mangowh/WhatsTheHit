var debug = require('debug')('whatsthehit:auth');

module.exports = (req, res, next) => {
  if (req.query["auth"] === "true") {
    next();
  } else {
    res.render("nope")
  }
}