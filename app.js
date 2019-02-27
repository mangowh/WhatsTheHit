require("dotenv").config();

const debug = require("debug")("whatsthehit:app"),
  path = require("path"),
  express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  helmet = require("helmet"),
  logger = require("morgan"),
  createError = require("http-errors"),
  cookieParser = require("cookie-parser"),
  csrf = require("csurf"),
  rateLimit = require("express-rate-limit")

const app = express();
const csrfProtection = csrf({ cookie: true });
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 10 minuti
  max: 1000, // limite di 1000 richieste
  message: "Troppe richieste, riprova più tardi"
});

app.use(helmet());
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.CSRF === "ON") {
  app.use(csrfProtection);
}

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

//impostazioni viste
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//routing statico
app.use("/", express.static(path.join(__dirname, "/static/dist")));

//Routing dell"indice
app.use("/", require("./src/routes/index.js"))

//rest api
app.use("/api", limiter, require("./src/routes/api.js"));

//Routing errore 404
app.use((req, res, next) => {
  next(createError(404))
});

//Routing errore 500
app.use((err, req, res, next) => {
  debug(err)

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