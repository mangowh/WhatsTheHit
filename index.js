"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");

const logger = require(path.join(__dirname, "/controller/logger.js"));

const app = express();

app.use(express.static(path.join(__dirname, "/app")));
app.use(morgan("tiny"));
app.use(logger.log);

app.get("/", (req, res) => {
  res.header("Content-Type", "text/html");
  res.sendFile(path.resolve("./app/dist/index.html"));
});

app.listen(8080);

console.log("Server attivo. Disponibile a http://localhost:8080");