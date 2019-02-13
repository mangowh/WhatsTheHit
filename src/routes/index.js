const debug = require("debug")("whatsthehit:index"),
  express = require('express'),
  router = express.Router(),
  path = require('path');

router.get("/", (req, res, next) => {
  res.header("Content-Type", "text/html");
  res.render(path.join(__dirname, "/../../dist", "index.pug"), {
    "_csrf": req.csrfToken()
  });
});

module.exports = router;