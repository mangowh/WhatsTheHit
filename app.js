require("dotenv").config();

var path = require("path");
var express = require("express");
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var logger = require("morgan");

var app = express();

/* view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
*/

app.use(logger("dev"));
app.use(express.json()); //middleware per gestione json
app.use(express.urlencoded({ extended: false })); //non è possibile inserire oggetti dentro altri oggetti
app.use(cookieParser()); //middleware per gestione cookie

app.use(express.static(path.join(__dirname, "/public"))); //contenuto statico

app.use("/", require("./routes/index.js"));

app.use("/query", require("./routes/query.js"));

app.use((req, res, next) => {
  next(createError(404));
});

app.listen(8080);

console.log("Server attivo. Disponibile a http://localhost:8080");