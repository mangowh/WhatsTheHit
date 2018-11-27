function log(req, res, next) {
  console.log("Test");
  next();
};

module.exports.log = log;