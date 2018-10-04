"use strict";

const path = require('path');
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, '/app')))

app.get("/", (req, res) => {
  res.header("Content-Type", "text/html");
  res.sendFile(path.resolve("./app/dist/index.html"));
});

app.listen(8080);

console.log("Server attivo. Disponibile a http://localhost:8080");