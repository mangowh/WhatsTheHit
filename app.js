require("dotenv").config();

var path = require("path");
var express = require("express");
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var cors = require('cors')
var logger = require("morgan");

var app = express();

//impostazioni viste
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//routing generico
app.use(logger("dev"));
app.use(express.json()); //middleware per gestione json
app.use(express.urlencoded({ extended: false })); //non è possibile inserire oggetti dentro altri oggetti
app.use(cookieParser()); //middleware per gestione cookie
app.use(cors()); 

app.use(express.static(path.join(__dirname, "/public"))); //contenuto statico

//routing pagine
app.use("/", require("./routes/index.js"));

//rest api
app.use("/query", require("./routes/query.js"));

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