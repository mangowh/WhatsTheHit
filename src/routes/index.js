const debug = require("debug")("whatsthehit:index"),
  express = require('express'),
  router = express.Router(),
  path = require('path');

router.get("/", (req, res, next) => {
  res.header("Content-Type", "text/html");
  if (req.csrfToken) {
    res.sendFile(path.join(__dirname, "/../../client/dist", "index.html"), {
      "_csrf": req.csrfToken()
    });
  } else {
    res.sendFile(path.join(__dirname, "/../../client/dist", "index.html"));
  }
});

module.exports = router;