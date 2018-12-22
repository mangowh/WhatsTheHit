require("dotenv").config();

const path = require("path"),
  express = require("express"),
  createError = require('http-errors'),
  cors = require('cors'),
  helmet = require('helmet'),
  logger = require("morgan")

const app = express();

//impostazioni viste
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

//routing generico
app.use(helmet());
app.use(cors());
app.use(express.json()); //middleware per gestione json
app.use(express.urlencoded({ extended: false })); //non è possibile inserire parametri dentro altri parametri

app.use(express.static(path.join(__dirname, "/public"))); //contenuto statico

//routing pagine
app.use("/", require("./src/routes/index.js"));

//rest api
app.use("/api", require("./src/routes/api.js"));

//routing errore 404
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log(err)

  res.header("Content-Type", "text/html");

  if (process.env.NODE_ENV !== "development") {
    delete err.stack
  }

  // setta variabili da passare al renderer
  res.locals.message = err.message;
  res.locals.error = err;

  // crea la pagina di errore
  res.status(err.status || 500);
  res.render("error");

});

module.exports = app;