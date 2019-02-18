const debug = require("debug")("whatsthehit:index"),
  express = require('express'),
  router = express.Router(),
  path = require('path');

router.get("/", (req, res, next) => {
  res.header("Content-Type", "text/html");
  if (req.csrfToken) {
    res.render(path.join(__dirname, "/../../static", "index.pug"), {
      "_csrf": req.csrfToken()
    });
  } else {
    res.render(path.join(__dirname, "/../../static", "index.pug"));
  }
});

module.exports = router;