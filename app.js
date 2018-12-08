require("dotenv").config();

const path = require("path");
const express = require("express");
const createError = require('http-errors');
const cors = require('cors')
const helmet = require('helmet')
const logger = require("morgan");

const app = express();

//impostazioni viste
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if(process.env.NODE_ENV == "development") {
  app.use(logger("dev"));
}

//routing generico
app.use(helmet());
app.use(cors());
app.use(express.json()); //middleware per gestione json
app.use(express.urlencoded({ extended: false })); //non è possibile inserire oggetti dentro altri oggetti

app.use(express.static(path.join(__dirname, "/public"))); //contenuto statico

//routing pagine
app.use("/", require("./routes/index.js"));

//rest api
app.use("/api", require("./routes/api.js"));

//routing errore 404
app.use((req, res, next) => {
  res.header("Content-Type", "text/html");
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.header("Content-Type", "text/html");

  // setta variabili da passare al renderer
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; //solo se in sviluppo mostra errore

  // crea la pagina di errore
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;