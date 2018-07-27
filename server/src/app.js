const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(
    {
      "titolo" : "Hello World!",
      "descrizione" : "Heilà"
    }, null, 4));
});

app.listen(8080);

console.log("Server attivo. Disponibile a http://localhost:8080");