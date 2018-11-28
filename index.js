"use strict";

require("dotenv").config();

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { Client } = require("pg");

const logger = require(path.join(__dirname, "/controller/logger.js"));

const app = express();
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

app.use(express.static(path.join(__dirname, "/app")));
app.use(morgan("dev"));
app.use(logger.log);

//Non usare funzione sincrona
client.connect(); //XXX
//#############

app.get("/", (req, res) => {
  res.header("Content-Type", "text/html");
  res.sendFile(path.resolve("./app/dist/index.html"));
});

app.get("/query", (req, res) => {
  res.header("Content-Type", "application/json");
  client.query("SELECT * FROM artista limit 10")
    .then(query => res.send(JSON.stringify(query.rows)));
});

app.listen(8080);

console.log("Server attivo. Disponibile a http://localhost:8080");